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
import com.example.demo.dto.request.Donation.DonationAddRequest;
import com.example.demo.dto.request.Donation.DonationUpdateRequest;
import com.example.demo.dto.response.DonationResponse;
import com.example.demo.service.DonationService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/donations")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DonationController {
    DonationService donationService;

    @GetMapping("/alldonations/{waterSystemId}")
    ApiResponse<List<DonationResponse>> getAllDonations(@PathVariable int waterSystemId) {
        return ApiResponse.<List<DonationResponse>>builder().result(donationService.getAllDonations(waterSystemId))
                .build();
    }

    @GetMapping("/{donationId}")
    ApiResponse<DonationResponse> getDonation(@PathVariable int donationId) {
        return ApiResponse.<DonationResponse>builder().result(donationService.getDonation(donationId))
                .build();
    }

    @PutMapping("/update")
    ApiResponse<DonationResponse> updateDonation(@RequestBody DonationUpdateRequest request) {
        return ApiResponse.<DonationResponse>builder().result(donationService.updateDonation(request)).build();
    }

    @PostMapping("/add")
    ApiResponse<DonationResponse> addDonation(@RequestBody DonationAddRequest request) {
        return ApiResponse.<DonationResponse>builder().result(donationService.addDonation(request)).build();
    }

    @DeleteMapping("/delete/{donationId}")
    ApiResponse<String> deleteDonation(@PathVariable int donationId) {
        donationService.deleteRecord(donationId);
        return ApiResponse.<String>builder().result("Delete successfully").build();
    }
}
