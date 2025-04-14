package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.ApiResponse;
import com.example.demo.dto.request.address.AddressAddRequest;
import com.example.demo.dto.request.address.AddressUpdateRequest;
import com.example.demo.dto.response.address.AddressResponse;
import com.example.demo.dto.request.address.AddressDeleteRequest;
import com.example.demo.service.AddressShippingService;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

@RestController
@RequestMapping("/myAddress")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AddressShippingController {
    AddressShippingService addressShippingService;

    
    @GetMapping("/getAllAddresses/{email}")
    ApiResponse<List<AddressResponse>> getAddress(@PathVariable String email) {
        return ApiResponse.<List<AddressResponse>>builder()
                .result(addressShippingService.getAllAddressOfClient(email))
                .build();
    }

    @GetMapping("/getDefaultAddress/{email}")
    ApiResponse<AddressResponse> getDefaultAddress(@PathVariable String email) {
        return ApiResponse.<AddressResponse>builder()
                .result(addressShippingService.getDefaultAddress(email))
                .build();
    }

    @PostMapping("/addingAddress")
    ApiResponse<List<AddressResponse>> addAddress(@RequestBody AddressAddRequest request) {
        return ApiResponse.<List<AddressResponse>>builder()
                .result(addressShippingService.addAddress(request))
                .build();
    }

    @PutMapping("/changingAddress")
    ApiResponse<List<AddressResponse>> updateAddress(@RequestBody AddressUpdateRequest request) {
        return ApiResponse.<List<AddressResponse>>builder()
                .result(addressShippingService.updateAddress(request))
                .build();
    }

    @DeleteMapping("/deleteAddress")
    ApiResponse<List<AddressResponse>> deleteAddress(@RequestBody AddressDeleteRequest request) {
        return ApiResponse.<List<AddressResponse>>builder()
                .result(addressShippingService.deleteAddress(request))
                .build();
    }
}
