package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.request.Donation.DonationAddRequest;
import com.example.demo.dto.request.Donation.DonationUpdateRequest;
import com.example.demo.dto.response.DonationResponse;
import com.example.demo.entity.Donation;
import com.example.demo.entity.WaterSystem;
import com.example.demo.exception.AppException;
import com.example.demo.mapper.DonationMapper;
import com.example.demo.repository.DonationRepository;
import com.example.demo.repository.WaterSystemRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DonationService {
    DonationRepository donationRepository;
    DonationMapper donationMapper;
    WaterSystemRepository waterSystemRepository;

    public List<DonationResponse> getAllDonations(int waterSystemId) {
        WaterSystem waterSystem = waterSystemRepository.findById(waterSystemId)
                .orElseThrow(() -> new AppException(null));
        List<Donation> donations = donationRepository.findByWaterSystem(waterSystem);
        List<DonationResponse> test = donations.stream().map(each -> donationMapper.toDonationResponse(each)).toList();
        return test;
    }

    public DonationResponse getDonation(int donationId) {
        Donation donation = donationRepository.findById(donationId).orElseThrow(() -> new AppException(null));
        return donationMapper.toDonationResponse(donation);
    }

    public DonationResponse addDonation(DonationAddRequest request) {
        WaterSystem waterSystem = waterSystemRepository.findById(request.getWaterSystemId())
                .orElseThrow(() -> new AppException(null));
        Donation donation = donationMapper.toDonation(request, waterSystem);
        donationRepository.save(donation);
        waterSystem.getDonations().add(donation);
        waterSystemRepository.save(waterSystem);
        return donationMapper.toDonationResponse(donation);
    }

    public DonationResponse updateDonation(DonationUpdateRequest request) {
        Donation donation = donationRepository.findById(request.getDonationId())
                .orElseThrow(() -> new AppException(null));
        donationMapper.toUpdateDonation(donation, request);
        donationRepository.save(donation);
        return donationMapper.toDonationResponse(donation);
    }

    public void deleteRecord(int donationId) {
        Donation donation = donationRepository.findById(donationId).orElseThrow(() -> new AppException(null));
        donationRepository.delete(donation);
    }
}
