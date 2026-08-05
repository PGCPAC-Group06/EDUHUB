package com.eduhub.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.CreateCourseRequest;
import com.eduhub.dto.UpdateCourseRequest;
import com.eduhub.service.CourseService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/courses")
public class CourseController {


    @Autowired
    private CourseService courseService;



    // Create Course
    @PostMapping
    public ResponseEntity<?> createCourse(

            HttpServletRequest request,

            @Valid @RequestBody CreateCourseRequest courseRequest) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(
                        courseService.createCourse(
                                userId,
                                courseRequest
                        )
                    );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }




    // Get All Courses
    @GetMapping
    public ResponseEntity<?> getAllCourses(

            HttpServletRequest request) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            return ResponseEntity.ok(
                    courseService.getAllCourses(userId)
            );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }





    // Get Course By Id
    @GetMapping("/{courseId}")
    public ResponseEntity<?> getCourseById(

            HttpServletRequest request,

            @PathVariable Integer courseId) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            return ResponseEntity.ok(
                    courseService.getCourseById(
                            userId,
                            courseId
                    )
            );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }





    // Update Course
    @PutMapping("/{courseId}")
    public ResponseEntity<?> updateCourse(

            HttpServletRequest request,

            @PathVariable Integer courseId,

            @Valid @RequestBody UpdateCourseRequest courseRequest) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            return ResponseEntity.ok(
                    courseService.updateCourse(
                            userId,
                            courseId,
                            courseRequest
                    )
            );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }





    // Delete Course
    @DeleteMapping("/{courseId}")
    public ResponseEntity<?> deleteCourse(

            HttpServletRequest request,

            @PathVariable Integer courseId) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            courseService.deleteCourse(
                    userId,
                    courseId
            );


            return ResponseEntity.ok(
                    "Course deleted successfully."
            );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

}