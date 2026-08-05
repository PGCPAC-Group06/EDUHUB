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

        // Email already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return "Email already exists";
        }

        // Fetch Role
        Role role = roleRepository
                .findByRoleName(registerRequest.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // Create User
        User user = new User();

        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());

        // Encrypt Password
        user.setPassword(
                passwordEncoder.encode(registerRequest.getPassword())
        );

        user.setRole(role);

        user.setStatus(Status.ACTIVE);

        if (role.getRoleName().equalsIgnoreCase("ROLE_STUDENT") || role.getRoleName().equalsIgnoreCase("STUDENT")) {
            user.setApprovalStatus(ApprovalStatus.APPROVED);
        } else {
            user.setApprovalStatus(ApprovalStatus.PENDING);
        }
        user.setCreatedAt(LocalDateTime.now());

        // Save User
        userRepository.save(user);

        return "User Registered Successfully";
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {

        // Find User
        User user = userRepository
                .findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Password Validation
        if (!passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid Password");
        }

        // User Status Check
        if (user.getStatus() == Status.BLOCKED) {
            throw new RuntimeException("Your ID is not active/suspended. Please contact the Administrator at admin@eduhub.com");
        }

        // Approval Check
        if (user.getApprovalStatus() == ApprovalStatus.PENDING) {
            throw new RuntimeException("Your account is pending approval");
        }

        if (user.getApprovalStatus() == ApprovalStatus.REJECTED) {
            throw new RuntimeException("Your account has been rejected");
        }

        // Generate JWT Token
        String token = jwtUtil.generateToken(
                user.getUserId(),
                user.getEmail(),
                user.getRole().getRoleName()
        );

        // Prepare Response
        LoginResponse response = new LoginResponse();

        response.setUserId(user.getUserId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().getRoleName());
        response.setToken(token);

        return response;
    }

    @Override
    public void changePassword(Integer userId, com.eduhub.dto.ChangePasswordRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Incorrect current password");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}