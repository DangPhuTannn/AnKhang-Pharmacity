package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int orderItemId;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    Order order;

    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    Medicine medicine;

    int quantity;
    String packageUnit;
    double totalPrice;
    double discountFromMedicine;
    double finalPrice;
}
