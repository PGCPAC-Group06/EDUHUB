package com.eduhub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eduhub.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
public class StudentController {
   
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public String test(){
        return "Student Access Granted";
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable("userId") Integer userId) {
        return userRepository.findById(userId)
                .map(user -> {
                    // Create a response map to match the frontend expectations
                    Map<String, Object> profile = new HashMap<>();
                    profile.put("user_id", user.getUserId());
                    profile.put("name", user.getName());
                    profile.put("email", user.getEmail());
                    profile.put("role", user.getRole().getRoleName());
                    // Dummy values for extra frontend fields not in User entity
                    profile.put("date_of_birth", "2001-03-14");
                    profile.put("gender", "Male");
                    profile.put("mobile", "+91 98765 43210");
                    profile.put("college_name", "DTU, New Delhi");
                    profile.put("degree", "B.Tech");
                    profile.put("city", "New Delhi");
                    return ResponseEntity.ok(profile);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
