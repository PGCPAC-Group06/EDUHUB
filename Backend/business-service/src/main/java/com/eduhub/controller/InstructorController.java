package com.eduhub.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.CreateInstructorRequest;
import com.eduhub.dto.UpdateInstructorRequest;
import com.eduhub.service.InstructorService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/instructors")
public class InstructorController {


    @Autowired
    private InstructorService instructorService;



    // Create Instructor
    @PostMapping
    public ResponseEntity<?> createInstructor(

            HttpServletRequest request,

            @Valid @RequestBody CreateInstructorRequest instructorRequest) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(
                        instructorService.createInstructor(
                                userId,
                                instructorRequest
                        )
                    );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }





    // Get All Instructors
    @GetMapping
    public ResponseEntity<?> getAllInstructors(

            HttpServletRequest request) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            return ResponseEntity.ok(
                    instructorService.getAllInstructors(userId)
            );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }





    // Get Instructor By Id
    @GetMapping("/{instructorId}")
    public ResponseEntity<?> getInstructorById(

            HttpServletRequest request,

            @PathVariable Integer instructorId) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            return ResponseEntity.ok(
                    instructorService.getInstructorById(
                            userId,
                            instructorId
                    )
            );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }





    // Update Instructor
    @PutMapping("/{instructorId}")
    public ResponseEntity<?> updateInstructor(

            HttpServletRequest request,

            @PathVariable Integer instructorId,

            @Valid @RequestBody UpdateInstructorRequest instructorRequest) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            return ResponseEntity.ok(
                    instructorService.updateInstructor(
                            userId,
                            instructorId,
                            instructorRequest
                    )
            );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }





    // Delete Instructor
    @DeleteMapping("/{instructorId}")
    public ResponseEntity<?> deleteInstructor(

            HttpServletRequest request,

            @PathVariable Integer instructorId) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            instructorService.deleteInstructor(
                    userId,
                    instructorId
            );


            return ResponseEntity.ok(
                    "Instructor deleted successfully."
            );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

}