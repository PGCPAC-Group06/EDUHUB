package com.eduhub.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.AddReviewRequest;
import com.eduhub.jwt.JwtUtil;
import com.eduhub.service.ReviewService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private JwtUtil jwtUtil;

    // Add Review
    @PostMapping
    public ResponseEntity<?> addReview(
            @RequestHeader("Authorization") String authorizationHeader,
            @Valid @RequestBody AddReviewRequest request) {

        try {

            String token = authorizationHeader.substring(7);

            Integer userId = jwtUtil.extractUserId(token);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(reviewService.addReview(userId, request));

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get Review By Id
    @GetMapping("/{reviewId}")
    public ResponseEntity<?> getReviewById(
            @PathVariable Integer reviewId) {

        try {

            return ResponseEntity.ok(
                    reviewService.getReviewById(reviewId));

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get Reviews By Enrollment
    @GetMapping("/enrollment/{enrollmentId}")
    public ResponseEntity<?> getReviewsByEnrollment(
            @PathVariable Integer enrollmentId) {

        try {

            return ResponseEntity.ok(
                    reviewService.getReviewsByEnrollment(
                            enrollmentId));

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Delete Review
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Integer reviewId) {

        try {

            String token = authorizationHeader.substring(7);

            Integer userId = jwtUtil.extractUserId(token);

            reviewService.deleteReview(userId, reviewId);

            return ResponseEntity.ok("Review deleted successfully.");

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}