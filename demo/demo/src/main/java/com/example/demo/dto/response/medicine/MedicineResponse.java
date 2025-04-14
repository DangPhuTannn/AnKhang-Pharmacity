package com.example.demo.dto.response.medicine;

import java.util.List;

import com.example.demo.dto.response.attribute.AttributeResponse;

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
public class MedicineResponse {
    int medicineId;
    String medicineName;
    String description;
    String ingredients;
    double price;
    boolean deleted;
    int totalQuantity;
    String packageUnit;
    int packageQuantity;
    String itemUnit;
    int itemQuantityPerPackage;
    double discount;
    String imageURL;
    List<AttributeResponse> targetPatiences; // type = TARGET_PATIENCE
    List<AttributeResponse> indications; // type = INDICATION
    List<AttributeResponse> categories; // type = CATEGORY
    List<AttributeResponse> flavorOrScents; // type = FLAVOR_OR_SCENT
    List<AttributeResponse> skinTypes; // type = SKIN_TYPE
    String brand;
    String originCountry;
}
