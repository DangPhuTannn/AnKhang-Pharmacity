package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.demo.dto.request.Donation.DonationAddRequest;
import com.example.demo.dto.request.Donation.DonationUpdateRequest;
import com.example.demo.dto.response.DonationResponse;
import com.example.demo.entity.Donation;
import com.example.demo.entity.WaterSystem;

@Mapper(componentModel = "spring")
public interface DonationMapper {
    DonationResponse toDonationResponse(Donation donation);

    @Mapping(ignore = true, target = "id")
    Donation toDonation(DonationAddRequest request, WaterSystem waterSystem);

    void toUpdateDonation(@MappingTarget Donation donation, DonationUpdateRequest request);
}
