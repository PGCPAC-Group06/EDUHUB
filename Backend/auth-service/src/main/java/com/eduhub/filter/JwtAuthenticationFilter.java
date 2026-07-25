package com.eduhub.filter;

import java.io.IOException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.eduhub.jwt.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    @Autowired
    private JwtUtil jwtUtil;



    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {



        String authHeader = request.getHeader("Authorization");


        String token = null;
        String email = null;
        String role = null;



        // Check Bearer Token
        if(authHeader != null && authHeader.startsWith("Bearer ")) {


            token = authHeader.substring(7);


            email = jwtUtil.extractEmail(token);


            role = jwtUtil.extractRole(token);

        }



        // Debug

        System.out.println("AUTH HEADER : " + authHeader);

        System.out.println("TOKEN : " + token);

        System.out.println("EMAIL : " + email);

        System.out.println("ROLE : " + role);




        // Authenticate User

        if(email != null &&
           SecurityContextHolder.getContext().getAuthentication() == null) {



            if(jwtUtil.validateToken(token)) {



                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(

                                email,

                                null,

                                Collections.singleton(
                                        new SimpleGrantedAuthority(
                                                "ROLE_" + role.toUpperCase()
                                        )
                                )
                        );



                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);



                System.out.println(
                        "USER AUTHENTICATED : " + email + 
                        " ROLE : " + role
                );

            }

        }



        filterChain.doFilter(request, response);

    }

}