package com.example.demo.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.example.demo.dto.response.cart.CartResponse;
import com.example.demo.dto.response.cartitem.CartItemResponse;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.Medicine;

@Mapper(componentModel = "spring")
public interface CartMapper {

    CartItem toCartItem(Cart cart, Medicine medicine, int quantity, boolean availableProduct);

    @Mapping(source = "cartItem.medicine.medicineName", target = "medicineName")
    @Mapping(source = "cartItem.medicine.packageUnit", target = "packageUnit")
    @Mapping(source = "cartItem.medicine.imageURL", target = "imageURL")
    CartItemResponse toCartItemResponse(CartItem cartItem);

    @Mapping(target = "clientEmail", source = "cart.client.email")
    @Mapping(target = "cartItemsList", expression = "java(mapCartItems(cart.getCartItemsList()))")
    CartResponse toCartResponse(Cart cart);

    @Named("mapCartItems")
    default List<CartItemResponse> mapCartItems(List<CartItem> cartItems) {
        return cartItems.stream()
                .map(this::toCartItemResponse)
                .collect(Collectors.toList());
    }

}
