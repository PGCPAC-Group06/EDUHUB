package com.eduhub.jwt;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;

@Component
public class JwtUtil {
    
	@Value("${jwt.secret}")
	private String secretKey;

    @Value("${jwt.expiration}")
	private long expirationTime;
   
	
    private SecretKey getKey() {

        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }


    // Generate Token with Role
    public String generateToken(String email, String role) {

        return Jwts.builder()

                .subject(email)

                .claim("role", role)

                .issuedAt(new Date())

                .expiration(
                    new Date(System.currentTimeMillis() + expirationTime)
                )

                .signWith(getKey())

                .compact();
    }


    // Extract Email
    public String extractEmail(String token) {

        return Jwts.parser()

                .verifyWith(getKey())

                .build()

                .parseSignedClaims(token)

                .getPayload()

                .getSubject();
    }


    // Extract Role
    public String extractRole(String token) {

        return Jwts.parser()

                .verifyWith(getKey())

                .build()

                .parseSignedClaims(token)

                .getPayload()

                .get("role", String.class);
    }


    // Validate Token
    public boolean validateToken(String token) {

        try {

            Jwts.parser()

                .verifyWith(getKey())

                .build()

                .parseSignedClaims(token);

            return true;

        }
        catch(Exception e) {

            return false;
        }
    }
}