package com.eduhub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.StudentProfileResponse;
import com.eduhub.dto.UpdateStudentProfileRequest;
import com.eduhub.service.StudentProfileService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/student/profile")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class StudentProfileController {

    @Autowired
    private StudentProfileService studentProfileService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getProfileByUserId(@PathVariable Integer userId) {
        try {
            return ResponseEntity.ok(studentProfileService.getStudentProfile(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getMyProfile(HttpServletRequest request) {
        try {
            Integer userId = (Integer) request.getAttribute("userId");
            if (userId == null) {
                userId = 101; // Fallback for default testing profile if unauthenticated in dev
            }
            return ResponseEntity.ok(studentProfileService.getStudentProfile(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateProfileByUserId(
            @PathVariable Integer userId,
            @RequestBody UpdateStudentProfileRequest updateRequest) {
        try {
            return ResponseEntity.ok(studentProfileService.updateStudentProfile(userId, updateRequest));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> updateMyProfile(
            HttpServletRequest request,
            @RequestBody UpdateStudentProfileRequest updateRequest) {
        try {
            Integer userId = (Integer) request.getAttribute("userId");
            if (userId == null) {
                userId = 101;
            }
            return ResponseEntity.ok(studentProfileService.updateStudentProfile(userId, updateRequest));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
