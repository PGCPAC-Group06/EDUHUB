package com.eduhub.controller;


import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< HEAD
=======
import org.springframework.http.HttpStatus;
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.EnrollCourseRequest;
<<<<<<< HEAD
import com.eduhub.service.EnrollmentService;


import jakarta.servlet.http.HttpServletRequest;


=======
import com.eduhub.jwt.JwtUtil;
import com.eduhub.service.EnrollmentService;

import jakarta.validation.Valid;
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

<<<<<<< HEAD

    @Autowired
    private EnrollmentService enrollmentService;



    @PostMapping
    public ResponseEntity<?> enrollCourse(

            HttpServletRequest request,

            @RequestBody EnrollCourseRequest enrollCourseRequest) {


        Integer userId =
                (Integer) request.getAttribute("userId");


        return ResponseEntity.ok(
                enrollmentService.enrollCourse(
                        userId,
                        enrollCourseRequest
                )
        );
    }





    @GetMapping
    public ResponseEntity<?> getMyEnrollments(

            HttpServletRequest request) {


        Integer userId =
                (Integer) request.getAttribute("userId");


        return ResponseEntity.ok(
                enrollmentService.getMyEnrollments(
                        userId
                )
        );
    }





    @GetMapping("/{enrollmentId}")
    public ResponseEntity<?> getEnrollmentById(

            HttpServletRequest request,

            @PathVariable Integer enrollmentId) {


        Integer userId =
                (Integer) request.getAttribute("userId");


        return ResponseEntity.ok(
                enrollmentService.getEnrollmentById(
                        userId,
                        enrollmentId
                )
        );
    }





    @DeleteMapping("/{enrollmentId}")
    public ResponseEntity<?> cancelEnrollment(

            HttpServletRequest request,

            @PathVariable Integer enrollmentId) {


        Integer userId =
                (Integer) request.getAttribute("userId");


        enrollmentService.cancelEnrollment(
                userId,
                enrollmentId
        );


        return ResponseEntity.ok(
                "Enrollment cancelled successfully"
        );
    }

=======
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
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
}