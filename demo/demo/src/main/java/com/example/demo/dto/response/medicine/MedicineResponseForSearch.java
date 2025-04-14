package com.example.demo.dto.response.medicine;

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
public class MedicineResponseForSearch {

    int medicineId;
    String medicineName;
    String description;
    String ingredients;
    double price;
    int totalQuantity;
    String packageUnit;
    int packageQuantity;
    String itemUnit;
    int itemQuantityPerPackage;
    double discount;
    String imageURL;
    String brand;
    String originCountry;
}
