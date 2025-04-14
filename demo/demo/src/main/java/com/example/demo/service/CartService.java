package com.example.demo.service;

import java.util.Optional;

import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.response.cart.CartResponse;
import com.example.demo.dto.response.cartitem.CartItemResponse;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.Client;
import com.example.demo.entity.Medicine;
import com.example.demo.entity.User;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.CartMapper;
import com.example.demo.repository.CartItemRepository;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.MedicineRepository;
import com.example.demo.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartService {
    CartRepository cartRepository;
    ClientRepository clientRepository;
    UserRepository userRepository;
    MedicineRepository medicineRepository;
    CartMapper cartMapper;
    CartItemRepository cartItemRepository;
    Logger log = LoggerFactory.getLogger(CartService.class);

    @PreAuthorize("hasRole('ADMIN') or #clientEmail == authentication.name")
    @Transactional
    public CartItemResponse addMedicineToCart(int medicineId, String clientEmail, int quantity) {
        Cart cart = getCartByClient(clientEmail);
        Medicine medicine = medicineRepository.findByMedicineId(medicineId)
                .orElseThrow(() -> new AppException(ErrorCode.MEDICINE_NOT_EXIST));

        CartItem cartItem = cart.getCartItemsList().stream()
                .filter(eachCartItem -> eachCartItem.getMedicine().getMedicineId() == medicineId)
                .findFirst()
                .orElse(null);

        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = CartItem.builder()
                    .cart(cart)
                    .medicine(medicine)
                    .quantity(quantity)
                    .build();

            cartItem.updateCartItemTotals();
            cartItem = cartItemRepository.save(cartItem);
            cart.getCartItemsList().add(cartItem);
        }
        cartRepository.save(cart);
        return cartMapper.toCartItemResponse(cartItem);
    }

    @PreAuthorize("hasRole('ADMIN') or #clientEmail == authentication.name")
    public CartItemResponse changeQuantityCartItemFromCart(int cartItemId, String clientEmail, int quantity) {
        Cart cart = getCartByClient(clientEmail);
        CartItem cartItem = findCartItemFromCart(cart, cartItemId);
        cartItem.setQuantity(quantity);
        cartItem.updateCartItemTotals();
        cartRepository.save(cart);
        return cartMapper.toCartItemResponse(cartItem);
    }

    @PreAuthorize("hasRole('ADMIN') or #clientEmail == authentication.name")
    public CartItemResponse deleteCartItemFromCart(int cartItemId, String clientEmail) {
        Cart cart = getCartByClient(clientEmail);
        CartItem cartItem = findCartItemFromCart(cart, cartItemId);
        cart.getCartItemsList().remove(cartItem);
        cartRepository.save(cart);
        return cartMapper.toCartItemResponse(cartItem);

    }

    @PreAuthorize("hasRole('ADMIN') or #email == authentication.name")
    public CartResponse getMyCart(String email) {
        Client client = getClientFromUser(email);
        Cart cart = cartRepository.findByClient(client);
        if (cart == null) {
            cart = Cart.builder().client(client).build();
            cartRepository.save(cart);
        }
        return cartMapper.toCartResponse(cart);
    }

    private Client getClientFromUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Client client = clientRepository.findByUser(user)
                .orElseThrow(() -> new AppException(ErrorCode.CLIENT_NOT_FOUND));
        return client;
    }

    private CartItem findCartItemFromCart(Cart cart, int cartItemId) {
        Optional<CartItem> cartItemOptional = cart.getCartItemsList().stream()
                .filter(eachCartItem -> eachCartItem.getCartItemId() == cartItemId)
                .findFirst();
        if (cartItemOptional.isEmpty()) {
            throw new AppException(ErrorCode.CARTITEM_NOT_EXIST);
        }
        CartItem cartItem = cartItemOptional.get();
        return cartItem;
    }

    private Cart getCartByClient(String clientEmail) {
        Client client = getClientFromUser(clientEmail);
        Cart cart = cartRepository.findByClient(client);
        if (cart == null) {
            Cart newCart = Cart.builder().client(client).build();
            return cartRepository.save(newCart);
        }
        return cart;

    }

}
