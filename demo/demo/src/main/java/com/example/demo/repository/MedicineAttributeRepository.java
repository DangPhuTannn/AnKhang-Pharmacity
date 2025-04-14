package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Attribute;
import com.example.demo.entity.MedicineAttribute;

public interface MedicineAttributeRepository extends JpaRepository<MedicineAttribute, Integer> {
    void deleteByAttribute(Attribute attribute);
}
