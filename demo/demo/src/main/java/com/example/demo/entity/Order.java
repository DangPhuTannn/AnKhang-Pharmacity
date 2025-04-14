package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;

import com.example.demo.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "`order`")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    int orderId;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    Client client;

    String name;
    String phone;
    String province;
    String district;
    String ward;
    String address;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    List<OrderItem> orderItems = new ArrayList<>();

    @Column(nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    LocalDate orderDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    OrderStatus orderStatus;


    double totalDiscountFromMedicine;
    double discountFromRank;
    double totalPrice;
    double totalDiscount;
    double finalPrice;
    double loyaltyPointsEarned;

    @Column(columnDefinition = "TEXT")
    String note;
}
