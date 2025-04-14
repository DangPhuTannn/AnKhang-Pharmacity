package com.example.demo.service;

import java.time.LocalDate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.request.user.UserCreationRequest;
import com.example.demo.dto.request.user.UserUpdateRequest;
import com.example.demo.entity.Client;
import com.example.demo.entity.User;
import com.example.demo.enums.UserType;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.AdminMapper;
import com.example.demo.mapper.ClientMapper;
import com.example.demo.mapper.DoctorMapper;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    ClientService clientService;
    ClientMapper clientMapper;
    DoctorMapper doctorMapper;
    AdminMapper adminMapper;
    // DoctorRepository doctorRepository;
    UserMapper userMapper;
    Logger log = LoggerFactory.getLogger(CartService.class);

    @Transactional
    public void createAccount(UserCreationRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }
        if (request.getDoB().isAfter(LocalDate.now())) {
            throw new AppException(ErrorCode.INVALID_DATE);
        }
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        User user = userMapper.toUser(request.getEmail(), encodedPassword);
        user.setUserType(UserType.CLIENT);
        request.setPassword(encodedPassword);
        clientService.createClient(request, user);
        userRepository.save(user);
    }

    @PreAuthorize("hasRole('ADMIN') or #email == authentication.name")
    @Transactional
    public Object updateAccount(String email, UserUpdateRequest request) {
        if (request.getDoB().isAfter(LocalDate.now())) {
            throw new AppException(ErrorCode.INVALID_DATE);
        }

        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));

        // if (request.getRoles().contains("ADMIN")) {
        // return adminMapper.toAdminResponse(adminUpdate);
        // }else if(request.getRoles().contains("DOCTOR")){
        // return doctorMapper.toDoctorResponse(doctorUpdate);
        // }
        Client client = clientService.updateClient(email, request);
        user.setPassword(client.getPassword());
        userRepository.save(user);
        return clientMapper.toClientResponse(client);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public Object deleteAccount(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));
        user.setDeleted(true);
        // if (request.getRoles().contains("ADMIN")) {
        // return adminMapper.toAdminResponse(adminUpdate);
        // }else if(request.getRoles().contains("DOCTOR")){
        // return doctorMapper.toDoctorResponse(doctorUpdate);
        // }

        userRepository.save(user);
        return clientService.deleteClient(email);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public Object restoreAccount(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));
        user.setDeleted(false);
        // if (request.getRoles().contains("ADMIN")) {
        // return adminMapper.toAdminResponse(adminUpdate);
        // }else if(request.getRoles().contains("DOCTOR")){
        // return doctorMapper.toDoctorResponse(doctorUpdate);
        // }

        userRepository.save(user);
        return clientService.restoreClient(email);
    }
}
