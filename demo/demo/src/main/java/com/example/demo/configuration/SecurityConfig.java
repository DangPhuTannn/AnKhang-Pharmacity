package com.example.demo.configuration;

import java.util.List;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.enums.Role;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecurityConfig {

        @NonFinal
        @Value("${jwt.signerKey}")
        String SIGNER_KEY;

        String[] PUBLIC_ENDPOINTS = { "/auth/token", "/auth/introspect", "/user/createAccount", "/waterSystem/**",
                        "/records/**", "/donations/**" };

        String[] USER_ENDPOINTS = { "/myAddress/**", "/attribute/**", "/cart/**", "/clients/myInfor",
                        "/medicines/allAttributes", "/medicines/getMedicine/name", "/order/**", "/user/update/**" };

        String[] ADMIN_ENDPOINTS = { "/medicines/**", "/clients/**" };

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity httpSecurity,
                        CorsConfigurationSource corsConfigurationSource)
                        throws Exception {
                httpSecurity
                                .authorizeHttpRequests(request -> request
                                                .requestMatchers(PUBLIC_ENDPOINTS).permitAll()
                                                .requestMatchers(USER_ENDPOINTS).hasAnyRole("CLIENT", "DOCTOR", "ADMIN")
                                                .requestMatchers(ADMIN_ENDPOINTS).hasRole("ADMIN")
                                                .anyRequest().authenticated())
                                .oauth2ResourceServer(oauth2 -> oauth2
                                                .jwt(jwtConfigurer -> jwtConfigurer.decoder(jwtDecoder())
                                                                .jwtAuthenticationConverter(
                                                                                jwtAuthenticationConverter()))
                                                .authenticationEntryPoint(new JwtAuthenticationEntryPoint()))
                                .csrf(AbstractHttpConfigurer::disable)
                                .cors(request -> request.configurationSource(corsConfigurationSource)); // Configure
                                                                                                        // CORS
                                                                                                        // explicitly

                return httpSecurity.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(List.of("http://localhost:5173")); // Add your frontend URL
                configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                configuration.setAllowedHeaders(List.of("*"));
                configuration.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }

        @Bean
        JwtAuthenticationConverter jwtAuthenticationConverter() {
                JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
                jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
                JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
                jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
                return jwtAuthenticationConverter;
        }

        @Bean
        JwtDecoder jwtDecoder() {

                SecretKeySpec secretKeySpec = new SecretKeySpec(SIGNER_KEY.getBytes(), "HS512");

                return NimbusJwtDecoder.withSecretKey(secretKeySpec)
                                .macAlgorithm(MacAlgorithm.HS512)
                                .build();
        }

        @Bean
        PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder(10);
        }
}
