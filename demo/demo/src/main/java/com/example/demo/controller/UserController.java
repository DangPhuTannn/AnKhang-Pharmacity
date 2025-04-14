package com.example.demo.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.ApiResponse;
import com.example.demo.dto.request.user.UserCreationRequest;
import com.example.demo.dto.request.user.UserUpdateRequest;
import com.example.demo.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @PostMapping("/createAccount")
    ApiResponse<String> createAccount(@RequestBody @Valid UserCreationRequest request) {
        userService.createAccount(request);
        return ApiResponse.<String>builder()
                .result("SignUp Successfully")
                .build();
    }

    @PutMapping("/update/{email}")
    ApiResponse<Object> updateAccount(@PathVariable String email, @RequestBody @Valid UserUpdateRequest request) {
        return ApiResponse.<Object>builder()
                .result(userService.updateAccount(email, request))
                .build();
    }

    @DeleteMapping("/delete/{email}")
    ApiResponse<Object> deleteAccount(@PathVariable String email) {
        return ApiResponse.<Object>builder()
                .result(userService.deleteAccount(email))
                .build();
    }

    @PutMapping("/restore/{email}")
    ApiResponse<Object> restoreAccount(@PathVariable String email) {
        return ApiResponse.<Object>builder()
                .result(userService.restoreAccount(email))
                .build();
    }
}
