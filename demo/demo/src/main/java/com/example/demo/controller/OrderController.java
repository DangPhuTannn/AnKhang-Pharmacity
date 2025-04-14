package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.ApiResponse;
import com.example.demo.dto.request.DateRangeRequest;
import com.example.demo.dto.request.address.AddressOrderUpdateRequest;
import com.example.demo.dto.request.order.OrderCreationRequest;
import com.example.demo.dto.request.order.OrderGetByFiltersRequest;
import com.example.demo.dto.response.order.OrderAvailableResponse;
import com.example.demo.dto.response.order.OrderResponse;
import com.example.demo.service.OrderService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
    OrderService orderService;

    // @GetMapping("/myOrder/{clientEmail}")
    // ApiResponse<List<OrderResponse>> myOrder(@PathVariable String clientEmail) {
    // return ApiResponse.<List<OrderResponse>>builder()
    // .result(orderService.myOrder(clientEmail))
    // .build();
    // }

    @GetMapping("/getAllOrders")
    ApiResponse<List<OrderResponse>> getAllOrders() {
        return ApiResponse.<List<OrderResponse>>builder()
                .result(orderService.getAllOrders())
                .build();
    }

    @PostMapping("/getOrdersByDateRange")
    ApiResponse<List<OrderResponse>> getOrdersByDateRange(@RequestBody DateRangeRequest request) {
        return ApiResponse.<List<OrderResponse>>builder()
                .result(orderService.getOrderByDateRange(request))
                .build();
    }

    @PostMapping("/getOrderByFilters")
    ApiResponse<List<OrderResponse>> getOrderByFilters(@RequestBody OrderGetByFiltersRequest request) {
        return ApiResponse.<List<OrderResponse>>builder()
                .result(orderService.getOrderByFilters(request))
                .build();
    }

    @PostMapping("/addOrder")
    ApiResponse<OrderAvailableResponse> addOrder(@RequestBody OrderCreationRequest request) {
        return ApiResponse.<OrderAvailableResponse>builder()
                .result(orderService.addOrder(request))
                .build();
    }

    @PutMapping("/updateOrder/updateAddress")
    ApiResponse<OrderResponse> updateAddressOrder(@RequestBody AddressOrderUpdateRequest request) {
        return ApiResponse.<OrderResponse>builder()
                .result(orderService.updateAddressOrder(request))
                .build();
    }

    @PutMapping("/updateOrder/updateStatus")
    ApiResponse<OrderResponse> updateOrderStatus(@RequestParam int orderId, @RequestParam String status) {
        return ApiResponse.<OrderResponse>builder()
                .result(orderService.updateOrderStatus(orderId, status))
                .build();
    }

    @DeleteMapping("/deleteOrder")
    ApiResponse<OrderResponse> deleteOrder(@RequestParam String clientEmail, @RequestParam int orderId) {
        return ApiResponse.<OrderResponse>builder()
                .result(orderService.deleteOrder(clientEmail, orderId))
                .build();

    }

}
