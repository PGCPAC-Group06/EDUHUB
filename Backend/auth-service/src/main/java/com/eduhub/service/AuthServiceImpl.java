package com.eduhub.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.eduhub.dto.LoginRequest;
import com.eduhub.dto.LoginResponse;
import com.eduhub.dto.RegisterRequest;
import com.eduhub.entity.ApprovalStatus;
import com.eduhub.entity.InstituteProfile;
import com.eduhub.entity.Role;
import com.eduhub.entity.Status;
import com.eduhub.entity.StudentProfile;
import com.eduhub.entity.User;
import com.eduhub.jwt.JwtUtil;
import com.eduhub.repository.InstituteProfileRepository;
import com.eduhub.repository.RoleRepository;
import com.eduhub.repository.StudentProfileRepository;
import com.eduhub.repository.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private InstituteProfileRepository instituteProfileRepository;

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public String register(RegisterRequest registerRequest) {

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        String reqRole = registerRequest.getRole() != null ? registerRequest.getRole().trim() : "student";

        Role role = roleRepository.findAll()
                .stream()
                .filter(r -> r.getRoleName().equalsIgnoreCase(reqRole)
                        || r.getRoleName().equalsIgnoreCase("ROLE_" + reqRole)
                        || r.getRoleName().toLowerCase().contains(reqRole.toLowerCase()))
                .findFirst()
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setRoleName(reqRole.toLowerCase());
                    return roleRepository.save(newRole);
                });

        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(role);
        user.setStatus(Status.ACTIVE);

        String roleStr = role.getRoleName().toLowerCase();

        if (roleStr.contains("institute")) {
            user.setApprovalStatus(ApprovalStatus.PENDING);
        } else {
            user.setApprovalStatus(ApprovalStatus.APPROVED);
        }

        user.setCreatedAt(LocalDateTime.now());
        User savedUser = userRepository.save(user);

        if (roleStr.contains("institute")) {
            InstituteProfile instituteProfile = new InstituteProfile();
            instituteProfile.setUser(savedUser);
            instituteProfile.setAddress(registerRequest.getAddress() != null ? registerRequest.getAddress() : "");
            instituteProfile.setGstin(registerRequest.getGstin() != null ? registerRequest.getGstin() : "");
            instituteProfile.setContactNo(registerRequest.getContact() != null ? registerRequest.getContact() : "");
            instituteProfileRepository.save(instituteProfile);
        } else if (roleStr.contains("student")) {
            StudentProfile studentProfile = new StudentProfile();
            studentProfile.setUser(savedUser);
            studentProfileRepository.save(studentProfile);
        }

        return "User Registered Successfully";
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        if (user.getStatus() == Status.BLOCKED) {
            throw new RuntimeException("Account is blocked by admin.");
        }

        String roleStr = user.getRole() != null ? user.getRole().getRoleName().toLowerCase() : "student";

        if (roleStr.contains("institute")) {
            if (user.getApprovalStatus() == ApprovalStatus.PENDING) {
                throw new RuntimeException("Your institute is pending admin approval.");
            }
            if (user.getApprovalStatus() == ApprovalStatus.REJECTED) {
                throw new RuntimeException("Your institute registration has been rejected.");
            }
        }

        String token = jwtUtil.generateToken(user);

        LoginResponse response = new LoginResponse();
        response.setUserId(user.getUserId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(roleStr);
        response.setToken(token);

        return response;
    }
}