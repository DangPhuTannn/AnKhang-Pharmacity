package com.example.demo.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
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
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medicine_id")
    int medicineId;

    @Column(name = "medicine_name")
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

    @Builder.Default
    double discount = 0;

    @Builder.Default
    boolean deleted = false;

    String imageURL;

    @OneToMany(mappedBy = "medicine", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    List<MedicineAttribute> medicineAttributes = new ArrayList<>();

    String brand;
    String originCountry;
}
