package com.eduhub.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.EnrollCourseRequest;
import com.eduhub.service.EnrollmentService;


import jakarta.servlet.http.HttpServletRequest;



@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {


    @Autowired
    private EnrollmentService enrollmentService;



    @PostMapping
    public ResponseEntity<?> enrollCourse(
            HttpServletRequest request,
            @RequestBody EnrollCourseRequest enrollCourseRequest) {

        Integer userId = (Integer) request.getAttribute("userId");
        if (userId == null) {
            userId = 101;
        }

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

        Integer userId = (Integer) request.getAttribute("userId");
        if (userId == null) {
            userId = 101;
        }

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

}