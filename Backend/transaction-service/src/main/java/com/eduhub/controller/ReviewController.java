package com.eduhub.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.AddReviewRequest;
import com.eduhub.service.ReviewService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;




@RestController
@RequestMapping("/api/reviews")
public class ReviewController {


    @Autowired
    private ReviewService reviewService;



    // Add Review
    @PostMapping
    public ResponseEntity<?> addReview(

            HttpServletRequest request,

            @Valid @RequestBody AddReviewRequest reviewRequest) {


        try {


            Integer userId = (Integer) request.getAttribute("userId");
            if (userId == null) {
                userId = 101;
            }



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

}