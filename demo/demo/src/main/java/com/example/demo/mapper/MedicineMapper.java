package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.example.demo.dto.request.medicine.MedicineCreationRequest;
import com.example.demo.dto.request.medicine.MedicineUpdateRequest;
import com.example.demo.dto.response.medicine.MedicineResponse;
import com.example.demo.dto.response.medicine.MedicineResponseForSearch;
import com.example.demo.entity.Medicine;

@Mapper(componentModel = "spring")
public interface MedicineMapper {
    Medicine toMedicine(MedicineCreationRequest request);

    MedicineResponse toMedicineResponse(Medicine medicine);

    MedicineResponseForSearch toMedicineResponseForSearch(Medicine medicine);

    void updateMedicine(@MappingTarget Medicine medicine, MedicineUpdateRequest request);

}
