package com.example.demo.configuration;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.entity.Admin;
import com.example.demo.entity.User;
import com.example.demo.enums.Role;
import com.example.demo.enums.UserType;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;
    AdminRepository adminRepository;
    UserRepository userRepository;

    @Bean
    ApplicationRunner applicationRunner() {
        return args -> {
            String email = "admin@gmail.com";
            String password = passwordEncoder.encode("admin");
            if (userRepository.findByEmail(email).isEmpty()) {
                Set<String> roles = new HashSet<>();
                roles.add(Role.ADMIN.name());

                User user = User.builder()
                        .email(email)
                        .password(password)
                        .userType(UserType.ADMIN)
                        .build();

                Admin admin = Admin.builder()
                        .name("Admin")
                        .email(email)
                        .gender(true)
                        .phone("0783481811")
                        .password(password)
                        .address("Admin Address")
                        .user(user)
                        .roles(roles)
                        .build();

                adminRepository.save(admin);
                log.warn("Admin has been created with default email admin@gmail.com and password admin");
            }
        };
    }
}
