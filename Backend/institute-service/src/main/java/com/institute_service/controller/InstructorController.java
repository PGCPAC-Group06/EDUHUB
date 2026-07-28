package com.institute_service.controller;

import com.institute_service.dto.InstructorRequest;
import com.institute_service.dto.InstructorResponse;
import com.institute_service.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructors")
@CrossOrigin(origins = "*")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @PostMapping
    public ResponseEntity<InstructorResponse> addInstructor(@RequestBody InstructorRequest request) {
        InstructorResponse response = instructorService.addInstructor(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{instructorId}")
    public ResponseEntity<InstructorResponse> updateInstructor(
            @PathVariable Integer instructorId,
            @RequestBody InstructorRequest request) {
        InstructorResponse response = instructorService.updateInstructor(instructorId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{instructorId}")
    public ResponseEntity<InstructorResponse> getInstructorById(@PathVariable Integer instructorId) {
        InstructorResponse response = instructorService.getInstructorById(instructorId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/institute/{instituteProfileId}")
    public ResponseEntity<List<InstructorResponse>> getInstructorsByInstitute(@PathVariable Integer instituteProfileId) {
        List<InstructorResponse> list = instructorService.getInstructorsByInstituteProfileId(instituteProfileId);
        return ResponseEntity.ok(list);
    }

    @GetMapping
    public ResponseEntity<List<InstructorResponse>> getAllInstructors() {
        List<InstructorResponse> list = instructorService.getAllInstructors();
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/{instructorId}")
    public ResponseEntity<String> deleteInstructor(@PathVariable Integer instructorId) {
        instructorService.deleteInstructor(instructorId);
        return ResponseEntity.ok("Instructor deleted successfully");
    }
}
