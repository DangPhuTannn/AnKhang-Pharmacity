package com.example.demo.dto.response.client;

import java.time.LocalDate;
import java.util.Set;

import com.example.demo.enums.RankClient;
import com.fasterxml.jackson.annotation.JsonFormat;

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
public class ClientResponse {

    int id;
    String name;
    String email;
    String phone;
    boolean gender;
    String address;
    RankClient rankClient;
    double loyaltyPoint;
    double discount;
    boolean deleted;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    LocalDate doB;

    Set<String> roles;
}
