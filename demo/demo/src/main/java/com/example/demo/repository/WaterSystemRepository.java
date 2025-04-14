package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.WaterSystem;

@Repository
public interface WaterSystemRepository extends JpaRepository<WaterSystem, Integer> {
   
}
