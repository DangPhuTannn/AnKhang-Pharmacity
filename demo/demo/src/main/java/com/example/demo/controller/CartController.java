package com.example.demo.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.ApiResponse;
import com.example.demo.dto.request.cart.CartAddRequest;
import com.example.demo.dto.request.cart.CartChangeRequest;
import com.example.demo.dto.request.cart.CartDeleteMedicineRequest;
import com.example.demo.dto.response.cart.CartResponse;
import com.example.demo.dto.response.cartitem.CartItemResponse;
import com.example.demo.service.CartService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartController {

        CartService cartService;

        @PostMapping("/addMedicineToCart")
        ApiResponse<CartItemResponse> addMedicineToCart(@RequestBody @Valid CartAddRequest request) {
                return ApiResponse.<CartItemResponse>builder()
                                .result(cartService.addMedicineToCart(request.getMedicineId(), request.getClientEmail(),
                                                request.getQuantity()))
                                .build();

        }

        @DeleteMapping("/deleteCartItemFromCart")
        ApiResponse<CartItemResponse> deleteCartItemFromCart(@RequestBody @Valid CartDeleteMedicineRequest request) {
                return ApiResponse.<CartItemResponse>builder()
                                .result(cartService.deleteCartItemFromCart(request.getCartItemId(),
                                                request.getClientEmail()))
                                .build();

        }

        @PutMapping("/changeQuantityCartItemFromCart")
        ApiResponse<CartItemResponse> changeQuantityCartItemFromCart(@RequestBody @Valid CartChangeRequest request) {
                return ApiResponse.<CartItemResponse>builder()
                                .result(cartService.changeQuantityCartItemFromCart(request.getCartItemId(),
                                                request.getClientEmail(),
                                                request.getQuantity()))
                                .build();
        }

        @GetMapping("/myCart/{email}")
        ApiResponse<CartResponse> getMyCart(@PathVariable String email) {
                return ApiResponse.<CartResponse>builder()
                                .result(cartService.getMyCart(email))
                                .build();
        }
}
