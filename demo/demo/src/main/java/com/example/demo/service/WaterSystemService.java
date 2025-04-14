package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.response.WaterSystemResponse;
import com.example.demo.entity.WaterSystem;
import com.example.demo.exception.AppException;
import com.example.demo.mapper.WaterSystemMapper;
import com.example.demo.repository.WaterSystemRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WaterSystemService {
    WaterSystemRepository waterSystemRepository;
    WaterSystemMapper waterSystemMapper;

    public List<WaterSystemResponse> getAllWaterSystems() {
        List<WaterSystem> listWaterSystems = waterSystemRepository.findAll();
        return listWaterSystems.stream()
                .map(eachWaterSystem -> waterSystemMapper.toWaterSystemResponse(eachWaterSystem)).toList();
    }

    public WaterSystemResponse getOneWaterSystem(int id){
        WaterSystem waterSystem = waterSystemRepository.findById(id).orElseThrow(()-> new AppException(null));
        return waterSystemMapper.toWaterSystemResponse(waterSystem);
    }
}
