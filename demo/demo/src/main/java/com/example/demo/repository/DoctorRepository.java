package com.example.demo.repository;

import com.example.demo.entity.Doctor;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    Optional<Doctor> findByUser(User user);
}
