package com.example.demo.entity;

import org.hibernate.annotations.Index;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
public class MedicineAttribute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int medicineAttributeId;

    @ManyToOne
    @JoinColumn(name = "medicine_id")
    @Index(name = "idx_medicine_id")
    Medicine medicine;

    @ManyToOne
    @JoinColumn(name = "attribute_id")
    @Index(name = "idx_attribute_id")
    Attribute attribute;
}
