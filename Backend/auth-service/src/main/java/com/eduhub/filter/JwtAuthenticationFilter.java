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
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;



@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {


    @Autowired
    private JwtUtil jwtUtil;



    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)

            throws ServletException, IOException {



        String token = null;

        String email = null;

        String role = null;



        Cookie[] cookies =
                request.getCookies();



        if(cookies != null){


            for(Cookie cookie : cookies){


                if("jwt".equals(cookie.getName())){


                    token = cookie.getValue();

                    break;
                }
            }
        }



        if(token != null &&
                jwtUtil.validateToken(token)){


            email =
                jwtUtil.extractEmail(token);


            role =
                jwtUtil.extractRole(token);

        }



        if(email != null &&
                SecurityContextHolder
                .getContext()
                .getAuthentication() == null){



            UsernamePasswordAuthenticationToken authentication =

                    new UsernamePasswordAuthenticationToken(

                            email,

                            null,

                            Collections.singletonList(

                                    new SimpleGrantedAuthority(

                                            "ROLE_" +
                                            role.toUpperCase()

                                    )
                            )
                    );



            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);

        }



        filterChain.doFilter(
                request,
                response
        );

    }

}