package com.eduhub.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.AssignCategoryRequest;
import com.eduhub.service.CourseCategoryService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/course-categories")
public class CourseCategoryController {


    @Autowired
    private CourseCategoryService courseCategoryService;



    // Assign Category to Course
    @PostMapping
    public ResponseEntity<?> assignCategory(

            HttpServletRequest request,

            @Valid @RequestBody AssignCategoryRequest categoryRequest) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(
                        courseCategoryService
                        .assignCategory(
                                userId,
                                categoryRequest
                        )
                    );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }





    // Remove Category from Course
    @DeleteMapping
    public ResponseEntity<?> removeCategory(

            HttpServletRequest request,

            @Valid @RequestBody AssignCategoryRequest categoryRequest) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            return ResponseEntity.ok(
                    courseCategoryService
                    .removeCategory(
                            userId,
                            categoryRequest
                    )
            );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }





    // Get Categories of Course
    @GetMapping("/course/{courseId}")
    public ResponseEntity<?> getCategoriesByCourse(

            HttpServletRequest request,

            @PathVariable Integer courseId) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            return ResponseEntity.ok(
                    courseCategoryService
                    .getCategoriesByCourse(
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

}