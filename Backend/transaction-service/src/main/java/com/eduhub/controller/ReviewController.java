package com.eduhub.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.AddReviewRequest;
<<<<<<< HEAD
import com.eduhub.service.ReviewService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;




=======
import com.eduhub.jwt.JwtUtil;
import com.eduhub.service.ReviewService;

import jakarta.validation.Valid;

>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

<<<<<<< HEAD

    @Autowired
    private ReviewService reviewService;



    // Get All Reviews
    @GetMapping("/all")
    public ResponseEntity<?> getAllReviews() {
        try {
            return ResponseEntity.ok(reviewService.getAllReviews());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get Average Rating
    @GetMapping("/average")
    public ResponseEntity<?> getAverageRating() {
        try {
            return ResponseEntity.ok(reviewService.getAverageRating());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
=======
    @Autowired
    private ReviewService reviewService;

    @Autowired
    private JwtUtil jwtUtil;
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a

    // Add Review
    @PostMapping
    public ResponseEntity<?> addReview(
<<<<<<< HEAD

            HttpServletRequest request,

            @Valid @RequestBody AddReviewRequest reviewRequest) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");



            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(
                        reviewService.addReview(
                                userId,
                                reviewRequest
                        )
                    );


        } catch (Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }





    // Get Review By Id
    @GetMapping("/{reviewId}")
    public ResponseEntity<?> getReviewById(

            @PathVariable Integer reviewId) {


        try {


            return ResponseEntity.ok(
                    reviewService.getReviewById(reviewId)
            );


        } catch(Exception e){


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }





    // Get Reviews By Enrollment
    @GetMapping("/enrollment/{enrollmentId}")
    public ResponseEntity<?> getReviewsByEnrollment(

            @PathVariable Integer enrollmentId) {


        try {


            return ResponseEntity.ok(
                    reviewService
                    .getReviewsByEnrollment(enrollmentId)
            );


        } catch(Exception e){


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }





    // Delete Review
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(

            HttpServletRequest request,

            @PathVariable Integer reviewId) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");



            reviewService.deleteReview(
                    userId,
                    reviewId
            );



            return ResponseEntity.ok(
                    "Review deleted successfully."
            );


        } catch(Exception e){


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

=======
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
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
}