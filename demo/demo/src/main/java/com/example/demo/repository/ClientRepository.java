package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Client;
import com.example.demo.entity.User;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer>, JpaSpecificationExecutor<Client> {
    Optional<Client> findByUser(User user);

    Optional<Client> findByEmail(String email);

    Client findByName(String name);
}
