package com.eduhub.jwt;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.eduhub.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationTime;

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

<<<<<<< HEAD
    // Generate Token
    public String generateToken(Integer userId, String email, String role) {

        return Jwts.builder()

                .claim("userId", userId)

                .subject(email)

                .claim("role", role)

=======
    // Generate Token with UserId + Role
    public String generateToken(User user) {
        String roleStr = user.getRole() != null ? user.getRole().getRoleName().toUpperCase() : "STUDENT";
        return Jwts.builder()
                .subject(user.getEmail())
                .claim("userId", user.getUserId())
                .claim("role", roleStr)
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis() + expirationTime)
                )
                .signWith(getKey())
                .compact();
    }

<<<<<<< HEAD
    // Extract UserId
    public Integer extractUserId(String token) {

        return Jwts.parser()

                .verifyWith(getKey())

                .build()

                .parseSignedClaims(token)

                .getPayload()

                .get("userId", Integer.class);
    }

=======
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
    // Extract Email
    public String extractEmail(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

<<<<<<< HEAD
=======
    // Extract UserId
    public Integer extractUserId(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("userId", Integer.class);
    }

>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
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
<<<<<<< HEAD

                    .verifyWith(getKey())

                    .build()

                    .parseSignedClaims(token);

            return true;

        } catch (Exception e) {

=======
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
            return false;
        }
    }
}