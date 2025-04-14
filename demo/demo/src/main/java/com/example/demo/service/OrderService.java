package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.request.DateRangeRequest;
import com.example.demo.dto.request.address.AddressOrderUpdateRequest;
import com.example.demo.dto.request.order.OrderCreationRequest;
import com.example.demo.dto.request.order.OrderGetByFiltersRequest;
import com.example.demo.dto.response.order.OrderAvailableResponse;
import com.example.demo.dto.response.order.OrderResponse;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.Client;
import com.example.demo.entity.Medicine;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;
import com.example.demo.enums.OrderStatus;
import com.example.demo.enums.RankClient;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.OrderMapper;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.MedicineRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.specifications.OrderSpecifications;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService {
    ClientRepository clientRepository;
    OrderRepository orderRepository;
    OrderMapper orderMapper;
    CartRepository cartRepository;
    MedicineRepository medicineRepository;

    // @PreAuthorize("hasRole('ADMIN') or #clientEmail == authentication.name")
    // public List<OrderResponse> myOrder(String clientEmail) {
    // Client client = getClientByEmail(clientEmail);
    // List<Order> orders = client.getOrders();

    // return orders.stream().map(eachOrder -> {
    // return orderMapper.toOrderResponse(eachOrder);
    // }).collect(Collectors.toList());
    // }

    @PreAuthorize("hasRole('ADMIN')")
    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream().map(eachOrder -> orderMapper.toOrderResponse(eachOrder)).toList();
    }

    @PreAuthorize("hasRole('ADMIN') or #request.clientEmail == authentication.name")
    public List<OrderResponse> getOrderByFilters(OrderGetByFiltersRequest request) {
        Client client = getClientByEmail(request.getClientEmail());
        Specification<Order> spec = Specification
                .where(OrderSpecifications.hasNameAndIdContain(request.getSearchValue()))
                .and(OrderSpecifications.hasOrderOfClient(client))
                .and(OrderSpecifications.hasOrderStatusIn(request.getListStatus()));
        Sort sort = Sort.by(Sort.Direction.DESC, "orderId");
        return orderRepository.findAll(spec, sort).stream()
                .map(eachOrder -> orderMapper.toOrderResponse(eachOrder)).toList();

    }

    @PreAuthorize("hasRole('ADMIN') or #request.clientEmail == authentication.name")
    @Transactional
    public OrderAvailableResponse addOrder(OrderCreationRequest request) {
        Client client = getClientByEmail(request.getClientEmail());
        Cart cart = cartRepository.findByClient(client);
        List<CartItem> selectedCartItems = cart.getCartItemsList().stream()
                .filter(eachCartItem -> request.getSelectedCartItemIdList().contains(eachCartItem.getCartItemId()))
                .toList();
        List<CartItem> unAvailableCartItems = checkAvailableCartItem(selectedCartItems);
        List<CartItem> overQuantityCartItems = checkOverQuantityCartItem(selectedCartItems);
        if (unAvailableCartItems.size() != 0 || overQuantityCartItems.size() != 0) {
            return OrderAvailableResponse.builder()
                    .unAvailableCartItems(
                            unAvailableCartItems.stream().map(eachCartItem -> eachCartItem.getCartItemId()).toList())
                    .overQuantityCartItems(
                            overQuantityCartItems.stream().map(eachCartItem -> eachCartItem.getCartItemId()).toList())
                    .build();
        }

        Order order = orderMapper.toOrder(request.getOrderDate(), OrderStatus.PROCESSING, request);
        decreaseMedicineQuantity(selectedCartItems);
        order.setOrderItems(orderMapper.mapCartItems(selectedCartItems, order));
        order.setClient(client);
        orderRepository.save(order);
        client.getOrders().add(order);
        return OrderAvailableResponse.builder()
                .build();
    }

    @PreAuthorize("hasRole('ADMIN') or #clientEmail == authentication.name")
    @Transactional
    public OrderResponse deleteOrder(String clientEmail, int orderId) {
        Order order = getOrderById(orderId);
        order.setOrderStatus(OrderStatus.CANCELED);
        increaseMedicineQuantity(order.getOrderItems());
        orderRepository.save(order);
        return orderMapper.toOrderResponse(order);

    }

    @PreAuthorize("hasRole('ADMIN') or #request.clientEmail == authentication.name")
    public OrderResponse updateAddressOrder(AddressOrderUpdateRequest request) {
        Order order = getOrderById(request.getOrderId());
        orderMapper.updateAddressOrder(order, request);
        return orderMapper.toOrderResponse(orderRepository.save(order));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public OrderResponse updateOrderStatus(int orderId, String status) {
        Order order = getOrderById(orderId);
        OrderStatus orderStatus = findOrderStatusByName(status);
        if (orderStatus == null) {
            throw new AppException(ErrorCode.ORDERSTATUS_NOT_EXIST);
        }

        order.setOrderStatus(orderStatus);
        if (orderStatus.name().equals("DELIVERED")) {
            updateLoyalPointAndLastDayBuyingForClient(order, 1);
        } else if (orderStatus.name().equals("CANCELED")) {
            increaseMedicineQuantity(order.getOrderItems());
        } else if (orderStatus.name().equals("RETURN")) {
            increaseMedicineQuantity(order.getOrderItems());
            updateLoyalPointAndLastDayBuyingForClient(order, -1);
        }

        return orderMapper.toOrderResponse(orderRepository.save(order));

    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<OrderResponse> getOrderByDateRange(DateRangeRequest request) {
        Specification<Order> spec = Specification
                .where(OrderSpecifications.hasOrderDateBetween(request.getStartDate(), request.getEndDate()));
        return orderRepository.findAll(spec).stream().map(orderMapper::toOrderResponse).toList();
    }

    private void updateLoyalPointAndLastDayBuyingForClient(Order order, double num) {
        Client client = order.getClient();
        double loyalPoint = client.getLoyaltyPoint() + (order.getLoyaltyPointsEarned() * num);
        client.setLoyaltyPoint(loyalPoint);
        client.setRankClient(getRankClient(loyalPoint));
        if (num == 1) {
            client.setLastDayBuying(LocalDate.now());
        }
        clientRepository.save(client);
    }

    private RankClient getRankClient(double loyalPoint) {
        RankClient rankClient = null;
        for (RankClient each : RankClient.values()) {
            if (loyalPoint >= each.getMinPoints()) {
                rankClient = each;
            }
        }
        return rankClient;
    }

    private OrderStatus findOrderStatusByName(String status) {
        for (OrderStatus eachOrderStatus : OrderStatus.values()) {
            if (eachOrderStatus.name().equals(status)) {
                return eachOrderStatus;
            }
        }
        return null;
    }

    private Order getOrderById(int orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_ID_NOT_EXIST));

        return order;
    }

    private void increaseMedicineQuantity(List<OrderItem> orderItem) {
        List<Medicine> updateMedicines = new ArrayList<>();
        orderItem.forEach(eachOrderItem -> {
            Medicine medicine = eachOrderItem.getMedicine();
            medicine.setTotalQuantity(medicine.getTotalQuantity() + eachOrderItem.getQuantity());
            updateMedicines.add(medicine);
        });
        medicineRepository.saveAll(updateMedicines);
    }

    private void decreaseMedicineQuantity(List<CartItem> selectedCartItems) {
        List<Medicine> updateMedicines = new ArrayList<>();
        selectedCartItems.forEach(eachCartItem -> {
            Medicine medicine = eachCartItem.getMedicine();
            medicine.setTotalQuantity(medicine.getTotalQuantity() - eachCartItem.getQuantity());
            updateMedicines.add(medicine);
        });
        medicineRepository.saveAll(updateMedicines);
    }

    private Client getClientByEmail(String clientEmail) {
        Client client = clientRepository.findByEmail(clientEmail)
                .orElseThrow(() -> new AppException(ErrorCode.CLIENT_NOT_FOUND));
        return client;
    }

    private List<CartItem> checkAvailableCartItem(List<CartItem> cartItemList) {
        List<CartItem> result = cartItemList.stream().filter(eachCartItem -> {
            Medicine medicine = eachCartItem.getMedicine();
            return medicine.getTotalQuantity() <= 0 || medicine.isDeleted();
        }).toList();
        return result;
    }

    private List<CartItem> checkOverQuantityCartItem(List<CartItem> cartItemList) {
        List<CartItem> result = cartItemList.stream().filter(eachCartItem -> {
            Medicine medicine = eachCartItem.getMedicine();
            return eachCartItem.getQuantity() > medicine.getTotalQuantity();
        }).toList();
        return result;
    }
}
