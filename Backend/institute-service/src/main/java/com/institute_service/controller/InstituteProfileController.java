package com.institute_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.institute_service.dto.InstituteProfileRequest;
import com.institute_service.dto.InstituteProfileResponse;
import com.institute_service.service.InstituteProfileService;

@RestController
@RequestMapping("/api/institute/profile")
public class InstituteProfileController {

    @Autowired
    private InstituteProfileService instituteProfileService;

    // View Logged-in Institute Profile
    @GetMapping
    public ResponseEntity<InstituteProfileResponse> getProfile(
            @RequestAttribute("userId") Integer userId) {

        return ResponseEntity.ok(
                instituteProfileService.getProfile(userId)
        );
    }

    // Update Logged-in Institute Profile
    @PutMapping
    public ResponseEntity<InstituteProfileResponse> updateProfile(
            @RequestAttribute("userId") Integer userId,
            @RequestBody InstituteProfileRequest request) {

        return ResponseEntity.ok(
                instituteProfileService.updateProfile(userId, request)
        );
    }
}