package com.example.demo.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.request.medicine.AttributeFilter;
import com.example.demo.dto.request.medicine.MedicineCreationRequest;
import com.example.demo.dto.request.medicine.MedicineUpdateRequest;
import com.example.demo.dto.response.attribute.AttributeResponse;
import com.example.demo.dto.response.medicine.MedicineResponse;
import com.example.demo.dto.response.medicine.MedicineResponseForSearch;
import com.example.demo.entity.Attribute;
import com.example.demo.entity.Medicine;
import com.example.demo.entity.MedicineAttribute;
import com.example.demo.enums.AttributeType;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.AttributeMapper;
import com.example.demo.mapper.MedicineMapper;
import com.example.demo.repository.AttributeRepository;
import com.example.demo.repository.MedicineRepository;
import com.example.demo.specifications.MedicineSpecifications;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MedicineService {
    MedicineRepository medicineRepository;
    MedicineMapper medicineMapper;
    AttributeMapper attributeMapper;
    AttributeRepository attributeRepository;
    Logger log = LoggerFactory.getLogger(CartService.class);

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public MedicineResponse createMedicine(MedicineCreationRequest request) {
        if (medicineRepository.existsByMedicineName(request.getMedicineName())) {
            throw new AppException(ErrorCode.MEDICINE_ALREADY_EXIST);
        }
        Medicine medicine = medicineMapper.toMedicine(request);
        Map<String, Attribute> attributeMap = attributeRepository.findAll().stream()
                .collect(Collectors.toMap(
                        eachAttribute -> eachAttribute.getName() + "#" + eachAttribute.getAttributeType().name(),
                        a -> a));
        addNewMedicineAttribute(request.getCategories(), medicine, attributeMap);
        addNewMedicineAttribute(request.getFlavorOrScents(), medicine, attributeMap);
        addNewMedicineAttribute(request.getIndications(), medicine, attributeMap);
        addNewMedicineAttribute(request.getSkinTypes(), medicine, attributeMap);
        addNewMedicineAttribute(request.getTargetPatiences(), medicine, attributeMap);
        Medicine savedMedicine = medicineRepository.save(medicine);
        Medicine resultMedicine = medicineRepository.findByIdWithAttributes(savedMedicine.getMedicineId())
                .orElseThrow(() -> new AppException(ErrorCode.MEDICINE_NOT_EXIST));
        return convertToList(resultMedicine, resultMedicine.getMedicineAttributes());
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<MedicineResponse> getMedicines() {
        List<Medicine> listMedicines = medicineRepository.findAll();
        return listMedicines.stream()
                .map(eachMedicine -> convertToList(eachMedicine, eachMedicine.getMedicineAttributes())).toList();
    }

    @PreAuthorize("isAuthenticated()")
    public List<MedicineResponse> getMedicinesByAllAttributes(double min, double max,
            List<AttributeFilter> filters, String sortOrder, String searchValue) {
        Specification<Medicine> spec = Specification.where(MedicineSpecifications.hasPriceBetween(min, max))
                .and(MedicineSpecifications.hasNameContains(searchValue));
        List<String> simpleAttributes = List.of("brand", "originCountry");
        for (AttributeFilter attributeFilter : filters) {
            if (attributeFilter.getAttributeValues() == null || attributeFilter.getAttributeValues().isEmpty()) {
                continue;
            }
            if (simpleAttributes.contains(attributeFilter.getAttributeType())) {
                spec = spec.and(MedicineSpecifications.hasSimpleAttributeIn(attributeFilter));
            } else {
                spec = spec.and(MedicineSpecifications.hasComplexAttributeIn(attributeFilter));
            }
        }
        Sort sort = sortOrder.equalsIgnoreCase("desc")
                ? Sort.by(Sort.Direction.DESC, "price")
                : Sort.by(Sort.Direction.ASC, "price");
        return medicineRepository.findAll(spec, sort).stream()
                .map(eachMedicine -> convertToList(eachMedicine, eachMedicine.getMedicineAttributes())).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public MedicineResponse getMedicineById(int id) {
        return medicineMapper.toMedicineResponse(
                medicineRepository.findByIdWithAttributes(id)
                        .orElseThrow(() -> new AppException(ErrorCode.MEDICINE_NOT_EXIST)));
    }

    @PreAuthorize("isAuthenticated()")
    public MedicineResponseForSearch getMedicineByName(String name) {
        Medicine medicine = medicineRepository.findByMedicineName(name)
                .orElseThrow(() -> new AppException(ErrorCode.MEDICINE_NOT_EXIST));
        return medicineMapper.toMedicineResponseForSearch(medicine);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public MedicineResponse updateMedicine(int medicine_id, MedicineUpdateRequest request) {
        Medicine medicine = medicineRepository.findByIdWithAttributes(medicine_id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
        removeAndAddAttribute(medicine, request);
        medicineMapper.updateMedicine(medicine, request);
        Medicine savedMedicine = medicineRepository.save(medicine);
        return convertToList(savedMedicine, savedMedicine.getMedicineAttributes());
    }

    @PreAuthorize("hasRole('ADMIN')")
    public MedicineResponse deleteMedicine(int medicine_id) {
        Medicine medicine = medicineRepository.findByMedicineId(medicine_id)
                .orElseThrow(() -> new AppException(ErrorCode.MEDICINE_NOT_EXIST));
        medicine.setDeleted(true);
        return medicineMapper.toMedicineResponse(medicineRepository.save(medicine));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public MedicineResponse restoreMedicine(int medicine_id) {
        Medicine medicine = medicineRepository.findByMedicineId(medicine_id)
                .orElseThrow(() -> new AppException(ErrorCode.MEDICINE_NOT_EXIST));
        medicine.setDeleted(false);
        return medicineMapper.toMedicineResponse(medicineRepository.save(medicine));
    }

    private void addNewMedicineAttribute(List<Attribute> listAttributes, Medicine medicine,
            Map<String, Attribute> attributeMap) {
        listAttributes.forEach(eachAttribute -> {
            Attribute attribute = attributeMap
                    .getOrDefault(eachAttribute.getName() + "#" + eachAttribute.getAttributeType().name(), null);
            if (attribute == null) {
                throw new AppException(ErrorCode.ATTRIBUTE_NOT_EXIST);
            }
            medicine.getMedicineAttributes().add(
                    MedicineAttribute.builder()
                            .medicine(medicine)
                            .attribute(attribute)
                            .build());
        });
    }

    private void removeAndAddAttribute(Medicine medicine, MedicineUpdateRequest request) {
        Map<AttributeType, Set<String>> prevAttributes = medicine.getMedicineAttributes().stream()
                .collect(Collectors.groupingBy(
                        ma -> ma.getAttribute().getAttributeType(),
                        Collectors.mapping(ma -> ma.getAttribute().getName(), Collectors.toSet())));

        Map<AttributeType, Set<String>> newAttributes = Map.of(
                AttributeType.CATEGORY,
                new HashSet<>(request.getCategories().stream().map(Attribute::getName).toList()),
                AttributeType.SKIN_TYPE,
                new HashSet<>(request.getSkinTypes().stream().map(Attribute::getName).toList()),
                AttributeType.FLAVOR_OR_SCENT,
                new HashSet<>(request.getFlavorOrScents().stream().map(Attribute::getName).toList()),
                AttributeType.TARGET_PATIENCE,
                new HashSet<>(request.getTargetPatiences().stream().map(Attribute::getName).toList()),
                AttributeType.INDICATION,
                new HashSet<>(request.getIndications().stream().map(Attribute::getName).toList()));

        medicine.getMedicineAttributes().removeIf(medicineAttribute -> {
            Attribute attribute = medicineAttribute.getAttribute();
            return !newAttributes.getOrDefault(attribute.getAttributeType(), Set.of()).contains(attribute.getName());
        });

        newAttributes.forEach((key, value) -> {
            value.stream().forEach(eachAttribute -> {
                if (!prevAttributes.getOrDefault(key, new HashSet<>()).contains(eachAttribute)) {
                    Attribute attribute = attributeRepository.findByNameAndAttributeType(eachAttribute, key)
                            .orElseThrow(() -> new AppException(ErrorCode.ATTRIBUTE_NOT_EXIST));
                    MedicineAttribute medicineAttribute = MedicineAttribute.builder()
                            .attribute(attribute)
                            .medicine(medicine)
                            .build();
                    medicine.getMedicineAttributes().add(medicineAttribute);
                }
            });
        });
    }

    private MedicineResponse convertToList(Medicine medicine, List<MedicineAttribute> medicineAttributes) {
        MedicineResponse medicineResponse = medicineMapper.toMedicineResponse(medicine);
        medicineResponse.setCategories(new ArrayList<>());
        medicineResponse.setFlavorOrScents(new ArrayList<>());
        medicineResponse.setIndications(new ArrayList<>());
        medicineResponse.setSkinTypes(new ArrayList<>());
        medicineResponse.setTargetPatiences(new ArrayList<>());

        for (MedicineAttribute medicineAttribute : medicineAttributes) {
            Attribute attribute = medicineAttribute.getAttribute();
            AttributeResponse attributeResponse = attributeMapper.toAttributeResponse(attribute);
            switch (attribute.getAttributeType().name()) {
                case "TARGET_PATIENCE":
                    medicineResponse.getTargetPatiences().add(attributeResponse);
                    break;
                case "INDICATION":
                    medicineResponse.getIndications().add(attributeResponse);
                    break;
                case "CATEGORY":
                    medicineResponse.getCategories().add(attributeResponse);
                    break;
                case "FLAVOR_OR_SCENT":
                    medicineResponse.getFlavorOrScents().add(attributeResponse);
                    break;
                case "SKIN_TYPE":
                    medicineResponse.getSkinTypes().add(attributeResponse);
                    break;
                default:
                    break;
            }
        }

        return medicineResponse;
    }

}
