package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.example.demo.dto.request.address.AddressAddRequest;
import com.example.demo.dto.request.address.AddressUpdateRequest;
import com.example.demo.dto.response.address.AddressResponse;
import com.example.demo.dto.request.address.AddressDeleteRequest;
import com.example.demo.entity.AddressShipping;
import com.example.demo.entity.Client;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.AddressShippingMapper;
import com.example.demo.repository.AddressShippingRepository;
import com.example.demo.repository.ClientRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AddressShippingService {
    AddressShippingRepository addressShippingRepository;
    ClientRepository clientRepository;
    AddressShippingMapper addressShippingMapper;

    @PreAuthorize("hasRole('ADMIN') or #email == authentication.name")
    public List<AddressResponse> getAllAddressOfClient(String email) {
        return addressShippingMapper.mapAddressShippingList(getAllAddressByClientEmail(email));
    }

    @PreAuthorize("hasRole('ADMIN') or #request.clientEmail == authentication.name")
    public List<AddressResponse> addAddress(AddressAddRequest request) {
        Client client = getClientByEmail(request.getClientEmail());
        if (request.isDefaultAddress()) {
            addressShippingRepository.findByClientAndDefaultAddressTrue(client)
                    .ifPresent(existingDefaultAddress -> {
                        existingDefaultAddress.setDefaultAddress(false);
                        addressShippingRepository.save(existingDefaultAddress);
                    });
        }
        AddressShipping addressShipping = addressShippingMapper.toAddressShipping(request);
        addressShipping.setClient(client);
        addressShippingRepository.save(addressShipping);
        return addressShippingMapper.mapAddressShippingList(getAllAddressByClientEmail(client.getEmail()));
    }

    @PreAuthorize("hasRole('ADMIN') or #email == authentication.name")
    public AddressResponse getDefaultAddress(String email) {
        Client client = getClientByEmail(email);
        Optional<AddressShipping> addressShippingOption = addressShippingRepository
                .findByClientAndDefaultAddressTrue(client);
        if (addressShippingOption.isEmpty()) {
            return AddressResponse.builder().build();
        }
        return addressShippingMapper.toAddressResponse(addressShippingOption.get());
    }

    @PreAuthorize("hasRole('ADMIN') or #request.clientEmail == authentication.name")
    public List<AddressResponse> updateAddress(AddressUpdateRequest request) {
        AddressShipping addressShipping = addressShippingRepository
                .findByAddressShippingId(request.getAddressShippingId())
                .orElseThrow(() -> new AppException(ErrorCode.ADDRESS_ID_NOT_EXIST));
        Client client = getClientByEmail(request.getClientEmail());
        Optional<AddressShipping> addressOptional = addressShippingRepository.findByClientAndDefaultAddressTrue(client);
        if (request.isDefaultAddress() && addressOptional.isPresent()) {
            AddressShipping defaultAddressShipping = addressOptional.get();
            defaultAddressShipping.setDefaultAddress(false);
            addressShippingRepository.save(defaultAddressShipping);
        } else if (addressOptional.isEmpty()) {
            List<AddressShipping> list = getAllAddressByClientEmail(client.getEmail());
            if (list.size() > 0) {
                AddressShipping tempAddressShipping = list.get(0);
                tempAddressShipping.setDefaultAddress(true);
                addressShippingRepository.save(tempAddressShipping);
            }
        }
        addressShippingMapper.updateAddressShipping(addressShipping, request);
        addressShippingRepository.save(addressShipping);
        return addressShippingMapper.mapAddressShippingList(getAllAddressByClientEmail(request.getClientEmail()));

    }

    @PreAuthorize("hasRole('ADMIN') or #request.clientEmail == authentication.name")
    public List<AddressResponse> deleteAddress(AddressDeleteRequest request) {
        addressShippingRepository.deleteById(request.getAddressShippingId());
        Client client = getClientByEmail(request.getClientEmail());
        Optional<AddressShipping> addressOptional = addressShippingRepository.findByClientAndDefaultAddressTrue(client);
        if (addressOptional.isEmpty()) {
            List<AddressShipping> list = getAllAddressByClientEmail(client.getEmail());
            if (list.size() > 0) {
                AddressShipping addressShipping = list.get(0);
                addressShipping.setDefaultAddress(true);
                addressShippingRepository.save(addressShipping);
            }
        }
        return addressShippingMapper.mapAddressShippingList(getAllAddressByClientEmail(request.getClientEmail()));

    }

    private Client getClientByEmail(String email) {
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.CLIENT_NOT_FOUND));
        return client;
    }

    private List<AddressShipping> getAllAddressByClientEmail(String email) {
        Client client = getClientByEmail(email);
        List<AddressShipping> list = addressShippingRepository.findAllByClient(client)
                .orElseThrow(() -> new AppException(ErrorCode.CLIENT_NOT_FOUND));
        return list;
    }
}
