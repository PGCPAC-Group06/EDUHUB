package com.eduhub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.eduhub.dto.InstructorDTO;
import com.eduhub.service.InstructorService;
import java.util.List;

@RestController
@RequestMapping("/api/instructors")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @PostMapping
    public InstructorDTO createInstructor(@RequestBody InstructorDTO dto) {
        return instructorService.createInstructor(dto);
    }

    @PutMapping("/{instructorId}")
    public InstructorDTO updateInstructor(@PathVariable Integer instructorId, @RequestBody InstructorDTO dto) {
        return instructorService.updateInstructor(instructorId, dto);
    }

    @DeleteMapping("/{instructorId}")
    public void deleteInstructor(@PathVariable Integer instructorId) {
        instructorService.deleteInstructor(instructorId);
    }

    @GetMapping("/institute/{instituteProfileId}")
    public List<InstructorDTO> getInstructorsByInstitute(@PathVariable Integer instituteProfileId) {
        return instructorService.getInstructorsByInstituteUserId(instituteProfileId);
    }
}
