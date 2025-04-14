package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.request.Record.RecordAddRequest;
import com.example.demo.dto.request.Record.RecordUpdateRequest;
import com.example.demo.dto.response.RecordResponse;
import com.example.demo.exception.AppException;
import com.example.demo.mapper.RecordMapper;
import com.example.demo.repository.RecordRepository;
import com.example.demo.repository.WaterSystemRepository;
import com.example.demo.entity.Record;
import com.example.demo.entity.WaterSystem;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RecordService {
    RecordRepository recordRepository;
    RecordMapper recordMapper;
    WaterSystemRepository waterSystemRepository;

    public List<RecordResponse> getAllRecords(int waterSystemId) {
        WaterSystem waterSystem = waterSystemRepository.findById(waterSystemId)
                .orElseThrow(() -> new AppException(null));
        List<Record> records = recordRepository.findByWaterSystem(waterSystem);
        return records.stream().map(each -> recordMapper.toRecordResponse(each)).toList();
    }

    public RecordResponse getRecord(int recordId) {
        Record record = recordRepository.findById(recordId).orElseThrow(() -> new AppException(null));
        return recordMapper.toRecordResponse(record);
    }

    public RecordResponse addRecord(RecordAddRequest request) {
        WaterSystem waterSystem = waterSystemRepository.findById(request.getWaterSystemId())
                .orElseThrow(() -> new AppException(null));
        Record record = recordMapper.toRecord(request, waterSystem);
        recordRepository.save(record);
        waterSystem.getRecords().add(record);
        waterSystemRepository.save(waterSystem);
        return recordMapper.toRecordResponse(record);
    
    }

    public RecordResponse updateRecord(RecordUpdateRequest request) {
        Record record = recordRepository.findById(request.getRecordId()).orElseThrow(() -> new AppException(null));
        recordMapper.toUpdateRecord(record, request);
        recordRepository.save(record);
        return recordMapper.toRecordResponse(record);
    }

    public void deleteRecord(int recordId) {
        Record record = recordRepository.findById(recordId).orElseThrow(() -> new AppException(null));
        recordRepository.delete(record);
    }
}
