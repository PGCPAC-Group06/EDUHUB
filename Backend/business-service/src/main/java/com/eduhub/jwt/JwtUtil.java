package com.eduhub.jwt;


import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;



@Component
public class JwtUtil {


    @Value("${jwt.secret}")
    private String secretKey;



    private SecretKey getKey() {

        return Keys.hmacShaKeyFor(
                secretKey.getBytes()
        );

    }




    // Extract User ID
    public Integer extractUserId(String token) {


        return Jwts.parser()

                .verifyWith(getKey())

                .build()

                .parseSignedClaims(token)

                .getPayload()

                .get("userId", Integer.class);

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


        } catch(Exception e) {


            return false;

        }

    }

}