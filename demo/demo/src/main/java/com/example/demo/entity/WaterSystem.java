package com.example.demo.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
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
public class WaterSystem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    String name;
    String location;

    @OneToMany(mappedBy = "waterSystem", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    List<Record> records = new ArrayList<>();

    @OneToMany(mappedBy = "waterSystem", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    List<Donation> donations = new ArrayList<>();
}
