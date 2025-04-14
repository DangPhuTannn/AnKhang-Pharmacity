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
import com.example.demo.dto.request.attribute.AllAttributeRequest;
import com.example.demo.dto.request.attribute.AttributeCreationRequest;
import com.example.demo.dto.request.attribute.AttributeUpdateRequest;
import com.example.demo.dto.response.attribute.AllAttributeResponse;
import com.example.demo.dto.response.attribute.AttributeResponse;
import com.example.demo.service.AttributeService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/attribute")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AttributeController {

    AttributeService attributeService;

    @GetMapping("/getAllAttributes")
    ApiResponse<List<AttributeResponse>> getAllAttributes() {
        return ApiResponse.<List<AttributeResponse>>builder()
                .result(attributeService.getAllAttributes())
                .build();
    }

    @GetMapping("/{type}")
    ApiResponse<List<AttributeResponse>> getAttributesByType(@PathVariable String type) {
        return ApiResponse.<List<AttributeResponse>>builder()
                .result(attributeService.getAttributesByType(type))
                .build();
    }

    @PostMapping("/findByTypes")
    ApiResponse<AllAttributeResponse> getAttributeByListTypes(@RequestBody AllAttributeRequest request) {
        return ApiResponse.<AllAttributeResponse>builder()
                .result(attributeService.getAttributeByListTypes(request.getTypes()))
                .build();
    }

    @PostMapping("/addAttribute")
    ApiResponse<AttributeResponse> addAttribute(@RequestBody AttributeCreationRequest request) {
        return ApiResponse.<AttributeResponse>builder()
                .result(attributeService.addAttribute(request))
                .build();
    }

    @PutMapping("/updateAttribute")
    ApiResponse<AttributeResponse> updateAttribute(@RequestBody AttributeUpdateRequest request) {
        return ApiResponse.<AttributeResponse>builder()
                .result(attributeService.updateAttribute(request))
                .build();
    }

    @DeleteMapping("/deleteAttribute/{attributeId}")
    ApiResponse<String> deleteAttribute(@PathVariable int attributeId) {
        attributeService.deleteAttribute(attributeId);
        return ApiResponse.<String>builder()
                .result("Delete successfully")
                .build();
    }

}
