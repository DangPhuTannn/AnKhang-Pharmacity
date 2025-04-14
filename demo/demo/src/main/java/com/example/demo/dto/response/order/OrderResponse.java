package com.example.demo.dto.response.order;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.dto.response.orderitem.OrderItemResponse;
import com.fasterxml.jackson.annotation.JsonFormat;

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
public class OrderResponse {

    int orderId;
    String orderStatus;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    LocalDate orderDate;

    double totalPrice;
    double totalDiscount;
    double finalPrice;
    double loyaltyPointsEarned;
    String name;
    String phone;
    String province;
    String district;
    String ward;
    String address;
    List<OrderItemResponse> orderItems;
    String note;
}
