package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.request.attribute.AttributeCreationRequest;
import com.example.demo.dto.request.attribute.AttributeUpdateRequest;
import com.example.demo.dto.response.attribute.AllAttributeResponse;
import com.example.demo.dto.response.attribute.AttributeResponse;
import com.example.demo.entity.Attribute;
import com.example.demo.enums.AttributeType;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.AttributeMapper;
import com.example.demo.repository.AttributeRepository;
import com.example.demo.repository.MedicineAttributeRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AttributeService {

    AttributeRepository attributeRepository;
    AttributeMapper attributeMapper;
    MedicineAttributeRepository medicineAttributeRepository;

    @PreAuthorize("hasRole('ADMIN')")
    public List<AttributeResponse> getAllAttributes() {
        return attributeRepository.findAll().stream()
                .map(eachAttribute -> attributeMapper.toAttributeResponse(eachAttribute)).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public AttributeResponse updateAttribute(AttributeUpdateRequest request) {
        Attribute attribute = attributeRepository.findByAttributeId(request.getAttributeId())
                .orElseThrow(() -> new AppException(ErrorCode.ATTRIBUTE_NOT_EXIST));
        attributeMapper.updateAttribute(attribute, request);
        return attributeMapper.toAttributeResponse(attributeRepository.save(attribute));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public AttributeResponse addAttribute(AttributeCreationRequest request) {
        Attribute attribute = Attribute.builder()
                .name(request.getName())
                .description(request.getDescription())
                .attributeType(AttributeType.valueOf(request.getAttributeType()))
                .build();
        return attributeMapper.toAttributeResponse(attributeRepository.save(attribute));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public void deleteAttribute(int attributeId) {
        Attribute attribute = attributeRepository.findByAttributeId(attributeId)
                .orElseThrow(() -> new AppException(ErrorCode.ATTRIBUTE_NOT_EXIST));
        medicineAttributeRepository.deleteByAttribute(attribute);
        attributeRepository.deleteById(attributeId);
       
    }

    @PreAuthorize("isAuthenticated()")
    public List<AttributeResponse> getAttributesByType(String type) {
        List<Attribute> attributes = attributeRepository.findAllByAttributeType(AttributeType.valueOf(type))
                .orElseThrow(() -> new AppException(ErrorCode.ATTRIBUTE_NOT_EXIST));
        return attributes.stream().map(eachAttribute -> attributeMapper.toAttributeResponse(eachAttribute)).toList();
    }

    @PreAuthorize("isAuthenticated()")
    public AllAttributeResponse getAttributeByListTypes(List<String> types) {
        List<AttributeType> attributeTypes = types.stream()
                .map(AttributeType::valueOf)
                .toList();
        List<Attribute> attributes = attributeRepository.findByAttributeTypeIn(attributeTypes)
                .orElseThrow(() -> new AppException(ErrorCode.ATTRIBUTE_TYPE_NOT_EXIST));

        List<AttributeResponse> attributeResponses = attributes.stream()
                .map(eachAttribute -> attributeMapper.toAttributeResponse(eachAttribute)).toList();

        return convertToListResponse(attributeResponses);
    }

    private AllAttributeResponse convertToListResponse(List<AttributeResponse> attributeResponses) {
        AllAttributeResponse allAttributeResponse = AllAttributeResponse.builder()
                .categories(new ArrayList<>())
                .flavorOrScents(new ArrayList<>())
                .indications(new ArrayList<>())
                .skinTypes(new ArrayList<>())
                .targetPatiences(new ArrayList<>())
                .build();
        attributeResponses.stream().forEach(eachAttributeResponse -> {
            AttributeType type = eachAttributeResponse.getAttributeType();
            switch (type) {
                case CATEGORY:
                    allAttributeResponse.getCategories().add(eachAttributeResponse);
                    break;
                case FLAVOR_OR_SCENT:
                    allAttributeResponse.getFlavorOrScents().add(eachAttributeResponse);
                    break;
                case INDICATION:
                    allAttributeResponse.getIndications().add(eachAttributeResponse);
                    break;
                case SKIN_TYPE:
                    allAttributeResponse.getSkinTypes().add(eachAttributeResponse);
                    break;
                default:
                    allAttributeResponse.getTargetPatiences().add(eachAttributeResponse);
            }
        });
        return allAttributeResponse;
    }

    // private AttributeType getAttributeType(String type) {
    // switch (type) {
    // case "category":
    // return AttributeType.CATEGORY;
    // case "flavorOrScent":
    // return AttributeType.FLAVOR_OR_SCENT;
    // case "indication":
    // return AttributeType.INDICATION;
    // case "targetPatience":
    // return AttributeType.TARGET_PATIENCE;
    // default:
    // return AttributeType.SKIN_TYPE;
    // }
    // }

}
