package com.eduhub.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.CreateInstituteProfileRequest;
import com.eduhub.dto.UpdateInstituteProfileRequest;
import com.eduhub.service.InstituteProfileService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/institute")
public class InstituteProfileController {


    @Autowired
    private InstituteProfileService instituteProfileService;



    // Create Institute Profile

    @PostMapping("/profile")
    public ResponseEntity<?> createProfile(

            HttpServletRequest request,

            @Valid @RequestBody CreateInstituteProfileRequest profileRequest) {


        try {

            Integer userId =
                    (Integer) request.getAttribute("userId");


            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(
                        instituteProfileService
                        .createProfile(userId, profileRequest)
                    );


        } catch (Exception e) {


            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());

        }
    }





    // Get Institute Profile

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(

            HttpServletRequest request) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            return ResponseEntity.ok(

                    instituteProfileService
                    .getProfile(userId)

            );


        } catch (Exception e) {


            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());

        }
    }





    // Update Institute Profile

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(

            HttpServletRequest request,

            @Valid @RequestBody UpdateInstituteProfileRequest profileRequest) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            return ResponseEntity.ok(

                    instituteProfileService
                    .updateProfile(userId, profileRequest)

            );


        } catch (Exception e) {


            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());

        }
    }

    // Get All Institutes
    @GetMapping("/all")
    public ResponseEntity<?> getAllInstitutes() {
        try {
            return ResponseEntity.ok(
                    instituteProfileService.getAllProfiles()
            );
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/students")
    public ResponseEntity<?> getStudents(HttpServletRequest request) {
        try {
            Integer userId = (Integer) request.getAttribute("userId");
            return ResponseEntity.ok(instituteProfileService.getStudents(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/dashboard-summary")
    public ResponseEntity<?> getDashboardSummary(HttpServletRequest request) {
        try {
            Integer userId = (Integer) request.getAttribute("userId");
            return ResponseEntity.ok(instituteProfileService.getDashboardSummary(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}