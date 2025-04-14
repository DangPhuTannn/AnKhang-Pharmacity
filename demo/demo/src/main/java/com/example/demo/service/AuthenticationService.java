package com.example.demo.service;

import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Set;
import java.util.StringJoiner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.demo.dto.request.AuthenticationRequest;
import com.example.demo.dto.request.IntrospectRequest;
import com.example.demo.dto.response.authentication.AuthenticationResponse;
import com.example.demo.dto.response.authentication.IntrospectResponse;
import com.example.demo.entity.Admin;
import com.example.demo.entity.Client;
import com.example.demo.entity.Doctor;
import com.example.demo.entity.User;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.AdminMapper;
import com.example.demo.mapper.ClientMapper;
import com.example.demo.mapper.DoctorMapper;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.DoctorRepository;
import com.example.demo.repository.UserRepository;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.KeyLengthException;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@CrossOrigin(origins = "http://localhost:5173")
public class AuthenticationService {

    ClientRepository clientRepository;
    ClientMapper clientMapper;
    UserRepository userRepository;
    DoctorRepository doctorRepository;
    DoctorMapper doctorMapper;
    AdminRepository adminRepository;
    AdminMapper adminMapper;
    PasswordEncoder passwordEncoder;
    Logger log = LoggerFactory.getLogger(AuthenticationService.class);
    @NonFinal
    @Value("${jwt.signerKey}")
    String SIGNER_KEY;

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        if (token == null) {
            return IntrospectResponse.builder()
                    .valid(false)
                    .build();
        }
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expityTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        return IntrospectResponse.builder()
                .valid(verified && expityTime.after(new Date()))
                .build();
    }

    @SuppressWarnings("rawtypes")
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));

        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (user.isDeleted()) {
            throw new AppException(ErrorCode.USER_DELETED);
        }

        if (!authenticated) {
            throw new AppException(ErrorCode.WRONG_PASSWORD);
            // throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        // truyền vào client or doctor
        var token = generateToken(user);

        return AuthenticationResponse.builder()
                .authenticated(true)
                .token(token)
                .userResponse(buildUserResponse(user))
                .build();

    }

    private String generateToken(User user) {
        // create header
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        // build payload -> build claims ( body )

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail()) // đại diện cho user đăng nhập
                .issuer("ankhang.com") // dc issue từ ai
                .issueTime(new Date()) // time
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli() // 1h
                )) // hết hạn
                .claim("scope", buildScope(user))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject()); // build payload
        JWSObject jwsObject = new JWSObject(header, payload); // truyển header và payload

        // kí token
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (KeyLengthException e) {
            e.printStackTrace();
        } catch (JOSEException e) {
            // log.error
            throw new RuntimeException(e);
        }
        return jwsObject.serialize();
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        Set<String> roles = getRoles(user);
        if (!org.springframework.util.CollectionUtils.isEmpty(roles)) {
            roles.forEach(stringJoiner::add);
        }
        return stringJoiner.toString();
    }

    private Set<String> getRoles(User user) {
        switch (user.getUserType()) {
            case CLIENT:
                Client client = clientRepository.findByUser(user)
                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
                return client.getRoles();
            case DOCTOR:
                Doctor doctor = doctorRepository.findByUser(user)
                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
                return doctor.getRoles();
            case ADMIN:
                Admin admin = adminRepository.findByUser(user)
                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
                return admin.getRoles();
            default:
                throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
    }

    private Object buildUserResponse(User user) {
        switch (user.getUserType()) {
            case CLIENT:
                Client client = clientRepository.findByUser(user)
                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
                return clientMapper.toClientResponse(clientRepository.save(client));
            case DOCTOR:
                Doctor doctor = doctorRepository.findByUser(user)
                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
                return doctorMapper.toDoctorResponse(doctor);
            case ADMIN:
                Admin admin = adminRepository.findByUser(user)
                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

                return adminMapper.toAdminResponse(admin);
            default:
                throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
    }
}
