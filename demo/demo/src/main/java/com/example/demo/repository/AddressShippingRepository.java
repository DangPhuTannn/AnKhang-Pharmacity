package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.AddressShipping;
import com.example.demo.entity.Client;

@Repository
public interface AddressShippingRepository extends JpaRepository<AddressShipping, Integer> {
    Optional<List<AddressShipping>> findAllByClient(Client client);

    Optional<AddressShipping> findByClientAndDefaultAddressTrue(Client client);

    Optional<AddressShipping> findByAddressShippingId(int addressId);
}
