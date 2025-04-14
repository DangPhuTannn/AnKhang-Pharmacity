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
import com.example.demo.dto.request.Record.RecordAddRequest;
import com.example.demo.dto.request.Record.RecordUpdateRequest;
import com.example.demo.dto.response.RecordResponse;
import com.example.demo.service.RecordService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/records")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RecordController {
    RecordService recordService;

    @GetMapping("/allrecords/{waterSystemId}")
    ApiResponse<List<RecordResponse>> getAllRecords(@PathVariable int waterSystemId) {
        return ApiResponse.<List<RecordResponse>>builder().result(recordService.getAllRecords(waterSystemId)).build();
    }

    @GetMapping("/{recordId}")
    ApiResponse<RecordResponse> getRecord(@PathVariable int recordId) {
        return ApiResponse.<RecordResponse>builder().result(recordService.getRecord(recordId)).build();
    }

    @PostMapping("/add")
    ApiResponse<RecordResponse> addRecord(@RequestBody RecordAddRequest request) {
        return ApiResponse.<RecordResponse>builder().result(recordService.addRecord(request)).build();
    }

    @PutMapping("/update")
    ApiResponse<RecordResponse> updateRecord(@RequestBody RecordUpdateRequest request) {
        return ApiResponse.<RecordResponse>builder().result(recordService.updateRecord(request)).build();
    }

    @DeleteMapping("/delete/{recordId}")
    ApiResponse<String> deleteRecord(@PathVariable int recordId) {
        recordService.deleteRecord(recordId);
        return ApiResponse.<String>builder().result("Delete successfully").build();
    }
}
