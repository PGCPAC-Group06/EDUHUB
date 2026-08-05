package com.eduhub.service;


import java.util.List;

import com.eduhub.dto.CourseResponse;
import com.eduhub.dto.CreateCourseRequest;
import com.eduhub.dto.UpdateCourseRequest;


public interface CourseService {

    CourseResponse createCourse(
            Integer userId,
            CreateCourseRequest request);

    List<CourseResponse> getAllCourses(
            Integer userId);

    CourseResponse getCourseById(
            Integer userId,
            Integer courseId);

    CourseResponse updateCourse(
            Integer userId,
            Integer courseId,
            UpdateCourseRequest request);

    void deleteCourse(
            Integer userId,
            Integer courseId);
}