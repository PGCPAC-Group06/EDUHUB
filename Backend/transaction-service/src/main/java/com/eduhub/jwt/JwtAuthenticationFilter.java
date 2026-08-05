package com.eduhub.jwt;

<<<<<<< HEAD
=======

>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
import java.io.IOException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

<<<<<<< HEAD

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;



@Component
public class JwtAuthenticationFilter 
        extends OncePerRequestFilter {

=======
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a

    @Autowired
    private JwtUtil jwtUtil;

<<<<<<< HEAD


=======
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
<<<<<<< HEAD

            throws ServletException, IOException {



        String token = null;

        String email = null;

        String role = null;

        Integer userId = null;



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


            userId =
                jwtUtil.extractUserId(token);


            email =
                jwtUtil.extractEmail(token);


            role =
                jwtUtil.extractRole(token);

        }



        if(userId != null){

            request.setAttribute(
                    "userId",
                    userId
            );

        }



        if(email != null &&
                role != null &&
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

=======
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        String token = null;
        String email = null;
        String role = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            token = authHeader.substring(7);

            if (jwtUtil.validateToken(token)) {

                email = jwtUtil.extractEmail(token);
                role = jwtUtil.extractRole(token);
            }
        }

        if (email != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            Collections.singletonList(
                                    new SimpleGrantedAuthority(
                                            "ROLE_" + role.toUpperCase()
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                                    )
                            )
                    );

<<<<<<< HEAD


            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);

        }



        filterChain.doFilter(
                request,
                response
        );

    }

=======
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
}