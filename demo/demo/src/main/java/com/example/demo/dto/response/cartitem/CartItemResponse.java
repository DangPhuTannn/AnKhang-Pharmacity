package com.example.demo.dto.response.cartitem;

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
public class CartItemResponse {

    int cartItemId;
    int quantity;
    double totalPrice;
    String imageURL;
    String medicineName;
    String packageUnit;
    double discountFromMedicine;
    double finalPrice;
}
