package com.eduhub.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.eduhub.dto.LoginRequest;
import com.eduhub.dto.LoginResponse;
import com.eduhub.dto.RegisterRequest;
import com.eduhub.entity.ApprovalStatus;
import com.eduhub.entity.Role;
import com.eduhub.entity.Status;
import com.eduhub.entity.User;
import com.eduhub.jwt.JwtUtil;
import com.eduhub.repository.RoleRepository;
import com.eduhub.repository.UserRepository;


@Service
public class AuthServiceImpl implements AuthService {


    @Autowired
    private UserRepository userRepository;


    @Autowired
    private RoleRepository roleRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private JwtUtil jwtUtil;



    @Override
    public String register(RegisterRequest registerRequest) {


        // Email check
        if(userRepository.existsByEmail(registerRequest.getEmail())) {

            return "Email already exists";
        }



        // Role fetch
        Role role = roleRepository
                .findByRoleName(registerRequest.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));



        // Create User
        User user = new User();


        user.setName(registerRequest.getName());

        user.setEmail(registerRequest.getEmail());


        // Password Encrypt
        user.setPassword(
                passwordEncoder.encode(registerRequest.getPassword())
        );


        user.setRole(role);


        user.setStatus(Status.ACTIVE);


        user.setApprovalStatus(ApprovalStatus.PENDING);


        user.setCreatedAt(LocalDateTime.now());



        // Save User
        userRepository.save(user);



        return "User Registered Successfully";
    }





    @Override
    public LoginResponse login(LoginRequest loginRequest) {


        User user = userRepository
                .findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));



        // Password Check
        if(!passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword())) {


            throw new RuntimeException("Invalid Password");
        }




        // Generate JWT Token with Role
        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().getRoleName()
        );





        // Response
        LoginResponse response = new LoginResponse();


        response.setUserId(user.getUserId());

        response.setName(user.getName());

        response.setEmail(user.getEmail());

        response.setRole(user.getRole().getRoleName());

        response.setToken(token);



        return response;
    }

}