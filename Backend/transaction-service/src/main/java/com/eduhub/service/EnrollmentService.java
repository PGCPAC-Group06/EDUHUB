package com.eduhub.service;


import java.util.List;

import com.eduhub.dto.EnrollCourseRequest;
import com.eduhub.dto.EnrollmentResponse;

public interface EnrollmentService {

    EnrollmentResponse enrollCourse(
            Integer userId,
            EnrollCourseRequest request);

    List<EnrollmentResponse> getMyEnrollments(
            Integer userId);

    EnrollmentResponse getEnrollmentById(
            Integer userId,
            Integer enrollmentId);

    void cancelEnrollment(
            Integer userId,
            Integer enrollmentId);
}