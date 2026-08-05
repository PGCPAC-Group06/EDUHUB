package com.eduhub.controller;

<<<<<<< HEAD

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.CreateCourseRequest;
import com.eduhub.dto.UpdateCourseRequest;
import com.eduhub.service.CourseService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;


=======
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.eduhub.dto.CourseRequestDTO;
import com.eduhub.dto.CourseResponseDTO;
import com.eduhub.service.CourseService;
import java.util.List;
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a

@RestController
@RequestMapping("/api/courses")
public class CourseController {

<<<<<<< HEAD

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
=======
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
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
