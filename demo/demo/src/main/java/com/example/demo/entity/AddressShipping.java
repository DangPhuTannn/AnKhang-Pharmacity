package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddressShipping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int addressShippingId;

    String name;
    String phone;
    String province;
    String district;
    String ward;
    String address;
    boolean defaultAddress;

    @ManyToOne
    @JoinColumn(name= "client_id", nullable = false)
    Client client;
}
