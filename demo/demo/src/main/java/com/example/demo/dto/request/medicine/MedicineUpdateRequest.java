package com.example.demo.dto.request.medicine;

import java.util.List;

import com.example.demo.entity.Attribute;

import jakarta.persistence.Lob;
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
public class MedicineUpdateRequest {

    String medicineName;

    @Lob
    String description;

    @Lob
    String ingredients;

    double price;
    int totalQuantity;
    String packageUnit;
    int packageQuantity;
    String itemUnit;
    int itemQuantityPerPackage;
    double discount;
    String imageURL;
    List<Attribute> targetPatiences;
    List<Attribute> indications;
    List<Attribute> categories;
    List<Attribute> flavorOrScents;
    List<Attribute> skinTypes;
    String brand;
    String originCountry;
}
