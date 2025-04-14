package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Donation;
import com.example.demo.entity.WaterSystem;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Integer> {

    List<Donation> findByWaterSystem(WaterSystem waterSystem);
}
