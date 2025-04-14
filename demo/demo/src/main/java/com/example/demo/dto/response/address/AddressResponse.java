package com.example.demo.dto.response.address;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddressResponse {
    
    int addressShippingId;
    String name;
    String phone;
    String province;
    String district;
    String ward;
    String address;
    boolean defaultAddress;
}
