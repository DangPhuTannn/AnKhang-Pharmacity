package com.example.demo.repository;


import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.CartItem;
import com.example.demo.entity.Medicine;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    Optional<Medicine> findByMedicine(Medicine medicine);
}
