package com.example.demo.mapper;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import com.example.demo.dto.request.address.AddressOrderUpdateRequest;
import com.example.demo.dto.request.order.OrderCreationRequest;
import com.example.demo.dto.response.order.OrderResponse;
import com.example.demo.dto.response.orderitem.OrderItemResponse;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;
import com.example.demo.enums.OrderStatus;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(target = "medicineName", source = "orderItem.medicine.medicineName")
    @Mapping(target = "packageUnit", source = "orderItem.medicine.packageUnit")
    @Mapping(target = "imageURL", source = "orderItem.medicine.imageURL")
    OrderItemResponse toOrderItemResponse(OrderItem orderItem);

    @Mapping(target = "totalPrice", source = "cartItem.totalPrice")
    @Mapping(target = "discountFromMedicine", source = "cartItem.discountFromMedicine")
    @Mapping(target = "finalPrice", source = "cartItem.finalPrice")
    @Mapping(target = "packageUnit", source = "cartItem.medicine.packageUnit")
    OrderItem toOrderItem(CartItem cartItem, Order order);

    @Mapping(target = "orderItems", expression = "java(mapOrderItems(order.getOrderItems()))")
    OrderResponse toOrderResponse(Order order);

    @Mapping(target = "loyaltyPointsEarned", source = "request.finalPrice")
    Order toOrder(LocalDate orderDate, OrderStatus orderStatus, OrderCreationRequest request);

    void updateAddressOrder(@MappingTarget Order order, AddressOrderUpdateRequest request);

    @Named("mapOrderItems")
    default List<OrderItemResponse> mapOrderItems(List<OrderItem> orderItems) {
        return orderItems.stream()
                .map(this::toOrderItemResponse)
                .collect(Collectors.toList());
    }

    @Named("mapCartItems")
    default List<OrderItem> mapCartItems(List<CartItem> cartItems, Order order) {
        return cartItems.stream()
                .map(eachCartItem -> toOrderItem(eachCartItem, order))
                .collect(Collectors.toList());
    }
}
