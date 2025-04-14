package com.example.demo.dto.response.orderitem;

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
public class OrderItemResponse {

    int orderItemId;
    String imageURL;
    String medicineName;
    int quantity;
    String packageUnit;
    double totalPrice;
    double discountFromMedicine;
    double finalPrice;
}
