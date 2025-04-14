package com.example.demo.mapper;

import org.mapstruct.Mapper;

import com.example.demo.dto.response.WaterSystemResponse;
import com.example.demo.entity.WaterSystem;

@Mapper(componentModel = "spring")
public interface WaterSystemMapper {

    WaterSystemResponse toWaterSystemResponse(WaterSystem waterSystem);
}
