package com.example.demo.mapper;

import org.mapstruct.Mapper;

import com.example.demo.dto.response.admin.AdminResponse;
import com.example.demo.entity.Admin;

@Mapper(componentModel = "spring")
public interface AdminMapper {
    
    AdminResponse toAdminResponse(Admin admin);
}
