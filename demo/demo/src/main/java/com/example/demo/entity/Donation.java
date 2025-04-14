package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    int amount;

    @Column(nullable = false)
    String date;

    @ManyToOne
    @JoinColumn(name = "water_system_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    WaterSystem waterSystem;
}