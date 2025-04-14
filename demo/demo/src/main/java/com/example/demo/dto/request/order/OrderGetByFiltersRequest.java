package com.example.demo.dto.request.order;

import java.util.List;

import com.example.demo.enums.OrderStatus;

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
public class OrderGetByFiltersRequest {

    String searchValue;
    String clientEmail;
    List<OrderStatus> listStatus;

}
