package com.institute_service.security;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtUtil {


    @Value("${jwt.secret}")
    private String secret;


    private SecretKey getKey() {

        return Keys.hmacShaKeyFor(secret.getBytes());
    }


    public Claims extractClaims(String token) {

        return Jwts.parser()

                .verifyWith(getKey())

                .build()

                .parseSignedClaims(token)

                .getPayload();
    }


    public Integer extractUserId(String token) {

        return extractClaims(token)
                .get("userId", Integer.class);
    }


    public boolean validateToken(String token) {

        try {

            extractClaims(token);

            return true;

        } catch(Exception e) {

            return false;
        }
    }
}