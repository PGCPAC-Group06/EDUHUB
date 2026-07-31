package com.eduhub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.eduhub.dto.CourseRequestDTO;
import com.eduhub.dto.CourseResponseDTO;
import com.eduhub.service.CourseService;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<CourseResponseDTO> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/institute/{instituteId}")
    public List<CourseResponseDTO> getCoursesByInstitute(@PathVariable Integer instituteId) {
        return courseService.getCoursesByInstituteUserId(instituteId);
    }

    @PostMapping
    public CourseResponseDTO createCourse(@RequestBody CourseRequestDTO dto) {
        return courseService.createCourse(dto);
    }

    @PutMapping("/{id}")
    public CourseResponseDTO updateCourse(@PathVariable Integer id, @RequestBody CourseRequestDTO dto) {
        return courseService.updateCourse(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Integer id) {
        courseService.deleteCourse(id);
    }

    @PutMapping("/{id}/approval")
    public void updateCourseApprovalStatus(@PathVariable Integer id, @RequestParam String status) {
        courseService.updateCourseApprovalStatus(id, status);
    }
}
