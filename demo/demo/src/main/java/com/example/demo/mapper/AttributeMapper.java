package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.example.demo.dto.request.attribute.AttributeUpdateRequest;
import com.example.demo.dto.response.attribute.AttributeResponse;
import com.example.demo.entity.Attribute;

@Mapper(componentModel = "spring")
public interface AttributeMapper {

    void updateAttribute(@MappingTarget Attribute attribute, AttributeUpdateRequest request);

    AttributeResponse toAttributeResponse(Attribute attribute);

}
