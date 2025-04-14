package com.example.demo.dto.response.order;

import java.util.ArrayList;
import java.util.List;

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
public class OrderAvailableResponse {

    @Builder.Default
    List<Integer> unAvailableCartItems = new ArrayList<>();

    @Builder.Default
    List<Integer> overQuantityCartItems = new ArrayList<>();
}
