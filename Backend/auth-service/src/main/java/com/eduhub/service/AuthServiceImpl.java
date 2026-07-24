package com.eduhub.service;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.eduhub.dto.LoginRequest;
import com.eduhub.dto.LoginResponse;
import com.eduhub.dto.RegisterRequest;
import com.eduhub.entity.ApprovalStatus;
import com.eduhub.entity.Role;
import com.eduhub.entity.Status;
import com.eduhub.entity.User;
import com.eduhub.repository.RoleRepository;
import com.eduhub.repository.UserRepository;


@Service
public class AuthServiceImpl implements AuthService {

	 private final PasswordEncoder passwordEncoder;
	 private final UserRepository userRepository;
	 private final RoleRepository roleRepository;

	    public AuthServiceImpl(UserRepository userRepository,
	                           RoleRepository roleRepository,
	                           PasswordEncoder passwordEncoder) {
	    	
	        this.userRepository = userRepository;
	        this.roleRepository = roleRepository;
	        this.passwordEncoder = passwordEncoder;
	    }

	    @Override
	    public String register(RegisterRequest request) {

	        // Check email already exists
	        if (userRepository.existsByEmail(request.getEmail())) {
	            return "Email already exists";
	        }

	        // Find role
	        Role role = roleRepository.findByRoleName(request.getRole().toUpperCase())
	                .orElseThrow(() -> new RuntimeException("Role not found"));

	        User user = new User();

	        user.setName(request.getName());
	        user.setEmail(request.getEmail());

	        // Plain password (Temporary)
	        user.setPassword(
	        	    passwordEncoder.encode(request.getPassword())
	        	);

	        user.setRole(role);
	        user.setStatus(Status.ACTIVE);

	        if (role.getRoleName().equalsIgnoreCase("INSTITUTE")) {
	            user.setApprovalStatus(ApprovalStatus.PENDING);
	        } else {
	            user.setApprovalStatus(ApprovalStatus.APPROVED);
	        }

	        user.setCreatedAt(LocalDateTime.now());

	        userRepository.save(user);

	        return "Registration Successful";
	    }

	    @Override
	    public LoginResponse login(LoginRequest request) {

	        
	        return null;
	    }

}
