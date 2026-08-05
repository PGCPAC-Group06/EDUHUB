package com.eduhub.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

import com.eduhub.filter.JwtAuthenticationFilter;



@Configuration
public class SecurityConfig {


    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;



    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {



        http

            .csrf(csrf -> csrf.disable())


            .cors(Customizer.withDefaults())


            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )



            .authorizeHttpRequests(auth -> auth



                // Public course listing
                .requestMatchers(
                    "/api/courses/**"
                )
                .hasAnyRole(
                    "STUDENT",
                    "INSTITUTE",
                    "ADMIN"
                )



                // Institute profile
                .requestMatchers(
                    "/api/institute/**"
                )
                .hasRole(
                    "INSTITUTE"
                )



                // Instructor
                .requestMatchers(
                    "/api/instructors/**"
                )
                .hasRole(
                    "INSTITUTE"
                )



                // Category management
                .requestMatchers(
                    "/api/categories/**"
                )
                .hasAnyRole(
                    "STUDENT",
                    "INSTITUTE",
                    "ADMIN"
                )



                // Course category mapping
                .requestMatchers(
                    "/api/course-categories/**"
                )
                .hasRole(
                    "INSTITUTE"
                )



                // Documents
                .requestMatchers(
                    "/api/institute/documents/**"
                )
                .hasRole(
                    "INSTITUTE"
                )



                .anyRequest()
                .authenticated()

            );



        http.addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
        );



        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}