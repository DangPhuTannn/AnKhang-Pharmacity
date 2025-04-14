package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.ApiResponse;
import com.example.demo.dto.request.medicine.AttributeFilterRequest;
import com.example.demo.dto.request.medicine.MedicineCreationRequest;
import com.example.demo.dto.request.medicine.MedicineUpdateRequest;
import com.example.demo.dto.response.medicine.MedicineResponse;
import com.example.demo.dto.response.medicine.MedicineResponseForSearch;
import com.example.demo.service.MedicineService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/medicines")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MedicineController {

    MedicineService medicineService;

    @PostMapping("/createMedicine")
    ApiResponse<MedicineResponse> createMedicine(@RequestBody @Valid MedicineCreationRequest request) {
        return ApiResponse.<MedicineResponse>builder()
                .result(medicineService.createMedicine(request))
                .build();
    }

    @GetMapping("/getAllMedicines")
    ApiResponse<List<MedicineResponse>> getMedicines() {
        return ApiResponse.<List<MedicineResponse>>builder()
                .result(medicineService.getMedicines())
                .build();
    }

    @PostMapping("/allAttributes")
    ApiResponse<List<MedicineResponse>> getMedicinesByAllAttributes(
            @RequestBody AttributeFilterRequest request) {
        double min;
        double max;
        if (request.getPriceRange() == null) {
            min = 0;
            max = Long.MAX_VALUE;
        } else {
            min = request.getPriceRange().getMin();
            max = request.getPriceRange().getMax();
        }

        return ApiResponse.<List<MedicineResponse>>builder()
                .result(medicineService.getMedicinesByAllAttributes(min, max, request.getListAttributeFilters(),
                        request.getSortOrder(), request.getSearchValue()))
                .build();
    }

    @GetMapping("/getMedicine/id")
    ApiResponse<MedicineResponse> getMedicine(@RequestParam int medicine_id) {
        return ApiResponse.<MedicineResponse>builder()
                .result(medicineService.getMedicineById(medicine_id))
                .build();
    }

    @GetMapping("/getMedicine/name")
    ApiResponse<MedicineResponseForSearch> getMedicineByName(@RequestParam String medicine_name) {
        return ApiResponse.<MedicineResponseForSearch>builder()
                .result(medicineService.getMedicineByName(medicine_name))
                .build();
    }

    @PutMapping("/update/{medicine_id}")
    ApiResponse<MedicineResponse> updateMedicine(@PathVariable int medicine_id,
            @RequestBody MedicineUpdateRequest request) {
        return ApiResponse.<MedicineResponse>builder()
                .result(medicineService.updateMedicine(medicine_id, request))
                .build();
    }

    @PutMapping("/restore/{medicine_id}")
    ApiResponse<String> restoreMedicine(@PathVariable int medicine_id) {
        medicineService.restoreMedicine(medicine_id);
        return ApiResponse.<String>builder()
                .result("Restore Successfully")
                .build();
    }

    @DeleteMapping("/delete/{medicine_id}")
    ApiResponse<String> deleteMedicine(@PathVariable int medicine_id) {
        medicineService.deleteMedicine(medicine_id);
        return ApiResponse.<String>builder()
                .result("Delete Successfully")
                .build();
    }

}
