package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.demo.dto.request.Record.RecordAddRequest;
import com.example.demo.dto.request.Record.RecordUpdateRequest;
import com.example.demo.dto.response.RecordResponse;
import com.example.demo.entity.Record;
import com.example.demo.entity.WaterSystem;

@Mapper(componentModel = "spring")
public interface RecordMapper {
    RecordResponse toRecordResponse(Record record);

    @Mapping(ignore = true, target = "id")
    Record toRecord(RecordAddRequest request, WaterSystem waterSystem);

    void toUpdateRecord(@MappingTarget Record record, RecordUpdateRequest request);
}
