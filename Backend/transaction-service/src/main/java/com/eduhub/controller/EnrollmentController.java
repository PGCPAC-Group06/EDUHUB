package com.eduhub.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.EnrollCourseRequest;
import com.eduhub.jwt.JwtUtil;
import com.eduhub.service.EnrollmentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private JwtUtil jwtUtil;

    // Enroll in Course
    @PostMapping
    public ResponseEntity<?> enrollCourse(
            @RequestHeader("Authorization") String authorizationHeader,
            @Valid @RequestBody EnrollCourseRequest request) {

        try {

            String token = authorizationHeader.substring(7);

            Integer userId = jwtUtil.extractUserId(token);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(enrollmentService.enrollCourse(userId, request));

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get My Enrollments
    @GetMapping
    public ResponseEntity<?> getMyEnrollments(
            @RequestHeader("Authorization") String authorizationHeader) {

        try {

            String token = authorizationHeader.substring(7);

            Integer userId = jwtUtil.extractUserId(token);

            return ResponseEntity.ok(
                    enrollmentService.getMyEnrollments(userId));

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get Enrollment By Id
    @GetMapping("/{enrollmentId}")
    public ResponseEntity<?> getEnrollmentById(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Integer enrollmentId) {

        try {

            String token = authorizationHeader.substring(7);

            Integer userId = jwtUtil.extractUserId(token);

            return ResponseEntity.ok(
                    enrollmentService.getEnrollmentById(
                            userId,
                            enrollmentId));

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Cancel Enrollment
    @PutMapping("/cancel/{enrollmentId}")
    public ResponseEntity<?> cancelEnrollment(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Integer enrollmentId) {

        try {

            String token = authorizationHeader.substring(7);

            Integer userId = jwtUtil.extractUserId(token);

            enrollmentService.cancelEnrollment(
                    userId,
                    enrollmentId);

            return ResponseEntity.ok("Enrollment cancelled successfully.");

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}