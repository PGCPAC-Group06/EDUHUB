package com.eduhub.service;

import java.util.List;
import com.eduhub.dto.CourseRequestDTO;
import com.eduhub.dto.CourseResponseDTO;

public interface CourseService {
    CourseResponseDTO createCourse(CourseRequestDTO dto);
    CourseResponseDTO updateCourse(Integer courseId, CourseRequestDTO dto);
    void deleteCourse(Integer courseId);
    List<CourseResponseDTO> getCoursesByInstituteUserId(Integer instituteUserId);
    List<CourseResponseDTO> getAllCourses();
    void updateCourseApprovalStatus(Integer courseId, String status);
}
