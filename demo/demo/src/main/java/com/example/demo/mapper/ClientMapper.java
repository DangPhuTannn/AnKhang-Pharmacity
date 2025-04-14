package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.demo.dto.request.user.UserCreationRequest;
import com.example.demo.dto.request.user.UserUpdateRequest;
import com.example.demo.dto.response.client.ClientResponse;
import com.example.demo.entity.Client;

@Mapper(componentModel = "spring")
public interface ClientMapper {
    Client toClient(UserCreationRequest request);

    @Mapping(target = "discount", expression = "java(client.getRankClient().getDiscount())")
    @Mapping(target = "id", source = "client.client_id")
    ClientResponse toClientResponse(Client client);

    @Mapping(target = "password", ignore = true)
    void updateClientWithOutPassword(@MappingTarget Client client, UserUpdateRequest request);

    @Mapping(target = "password", source = "request.newPassword")
    void updateClient(@MappingTarget Client client, UserUpdateRequest request);
}
