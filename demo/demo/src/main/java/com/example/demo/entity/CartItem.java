package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int cartItemId;

    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    Cart cart;

    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    Medicine medicine;

    int quantity;
    double totalPrice;
    double discountFromMedicine;
    double finalPrice;

    public void updateCartItemTotals() {
        totalPrice = medicine.getPrice() * quantity;
        discountFromMedicine = totalPrice * (medicine.getDiscount() / 100);
        finalPrice = totalPrice - discountFromMedicine;
    }
}
