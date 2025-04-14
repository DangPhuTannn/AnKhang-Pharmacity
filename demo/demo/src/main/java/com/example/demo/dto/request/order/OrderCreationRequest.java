package com.example.demo.dto.request.order;

import java.time.LocalDate;
import java.util.List;

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
public class OrderCreationRequest {

    String clientEmail;
    List<Integer> selectedCartItemIdList;
    String name;
    String phone;
    String province;
    String district;
    String ward;
    String address;
    double totalPrice;
    double totalDiscountFromMedicine;
    double discountFromRank;
    double totalDiscount;
    double finalPrice;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    LocalDate orderDate;

    String note;
}
