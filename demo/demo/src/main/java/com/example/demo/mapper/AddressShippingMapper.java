package com.example.demo.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import com.example.demo.dto.request.address.AddressAddRequest;
import com.example.demo.dto.request.address.AddressUpdateRequest;
import com.example.demo.dto.response.address.AddressResponse;
import com.example.demo.entity.AddressShipping;

@Mapper(componentModel = "spring")
public interface AddressShippingMapper {

    AddressShipping toAddressShipping(AddressAddRequest clientAddAddressRequest);

    AddressResponse toAddressResponse(AddressShipping addressShipping);

    void updateAddressShipping(@MappingTarget AddressShipping addressShipping, AddressUpdateRequest request);

    @Named("mapAddressShippingList")
    default List<AddressResponse> mapAddressShippingList(List<AddressShipping> addressShippings) {
        return addressShippings.stream()
                .map(this::toAddressResponse)
                .collect(Collectors.toList());
    }
}
