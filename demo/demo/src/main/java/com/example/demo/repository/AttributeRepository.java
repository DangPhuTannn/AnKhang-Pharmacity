package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Attribute;
import com.example.demo.enums.AttributeType;

public interface AttributeRepository extends JpaRepository<Attribute, Integer> {

    Optional<Attribute> findByNameAndAttributeType(String name, AttributeType attributeType);

    Optional<Attribute> findByAttributeId(int attributeId);

    Optional<List<Attribute>> findAllByAttributeType(AttributeType attributeType);

    Optional<List<Attribute>> findByAttributeTypeIn(List<AttributeType> attributeTypes);
}
