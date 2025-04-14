package com.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Cart;
import com.example.demo.entity.Client;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

    Cart findByClient(Client client);

}
