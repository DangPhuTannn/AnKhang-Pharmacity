package com.example.demo.entity;

import com.example.demo.enums.AttributeType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Attribute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int attributeId;

    String name;
    String description;

    @Enumerated(EnumType.STRING)
    AttributeType attributeType;
}
