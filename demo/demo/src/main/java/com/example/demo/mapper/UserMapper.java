package com.example.demo.mapper;

import org.mapstruct.Mapper;

import com.example.demo.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(String email, String password);
}
