package com.example.demo.mapper;

import org.mapstruct.Mapper;

import com.example.demo.dto.response.doctor.DoctorResponse;
import com.example.demo.entity.Doctor;

@Mapper(componentModel = "spring")
public interface DoctorMapper {

    DoctorResponse toDoctorResponse(Doctor doctor);
}
