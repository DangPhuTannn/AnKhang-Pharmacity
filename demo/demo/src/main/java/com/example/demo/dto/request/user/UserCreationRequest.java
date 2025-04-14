package com.example.demo.dto.request.user;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

public class UserCreationRequest {

    String name;

    @Email(message = "EMAIL_WRONG_FORM")
    String email;

    String password;

    @Pattern(regexp = "\\d{10}", message = "ONLY_NUM_AND_LENGTH_PHONE")
    String phone;

    @Lob
    String address;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    LocalDate doB;

    boolean gender;
}
