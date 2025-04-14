package com.example.demo.dto.response.cart;

import java.util.List;

import com.example.demo.dto.response.cartitem.CartItemResponse;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartResponse {

    String clientEmail;
    List<CartItemResponse> cartItemsList;
}
