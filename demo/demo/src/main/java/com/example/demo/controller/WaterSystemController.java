package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.ApiResponse;
import com.example.demo.dto.response.WaterSystemResponse;
import com.example.demo.service.WaterSystemService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/waterSystem")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WaterSystemController {

    WaterSystemService waterSystemService;

    @GetMapping
    ApiResponse<List<WaterSystemResponse>> getAllWaterSystems() {
        return ApiResponse.<List<WaterSystemResponse>>builder()
                .result(waterSystemService.getAllWaterSystems())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<WaterSystemResponse> getOneWaterSystem(@PathVariable int id) {
        return ApiResponse.<WaterSystemResponse>builder()
                .result(waterSystemService.getOneWaterSystem(id))
                .build();
    }

}
