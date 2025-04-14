package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Record;
import com.example.demo.entity.WaterSystem;

@Repository
public interface RecordRepository extends JpaRepository<Record, Integer> {
    List<Record> findByWaterSystem(WaterSystem waterSystem);
}
