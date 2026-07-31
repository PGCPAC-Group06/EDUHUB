package com.eduhub.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eduhub.dto.EnrollCourseRequest;
import com.eduhub.dto.EnrollmentResponse;
import com.eduhub.entity.Enrollment;
import com.eduhub.entity.EnrollmentStatus;
import com.eduhub.repository.EnrollmentRepository;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Override
    public EnrollmentResponse enrollCourse(
            Integer userId,
            EnrollCourseRequest request) {

        if (enrollmentRepository.findByStudentUserIdAndCourseId(
                userId,
                request.getCourseId()).isPresent()) {

            throw new RuntimeException(
                    "You are already enrolled in this course.");
        }

        Enrollment enrollment = new Enrollment();

        enrollment.setStudentUserId(userId);
        enrollment.setCourseId(request.getCourseId());
        enrollment.setStatus(EnrollmentStatus.active);

        Enrollment savedEnrollment =
                enrollmentRepository.save(enrollment);

        EnrollmentResponse response =
                new EnrollmentResponse();

        BeanUtils.copyProperties(savedEnrollment, response);

        return response;
    }

    @Override
    public List<EnrollmentResponse> getMyEnrollments(
            Integer userId) {

        List<Enrollment> enrollments =
                enrollmentRepository.findByStudentUserId(userId);

        return enrollments.stream().map(enrollment -> {

            EnrollmentResponse response =
                    new EnrollmentResponse();

            BeanUtils.copyProperties(enrollment, response);

            return response;

        }).collect(Collectors.toList());
    }

    @Override
    public EnrollmentResponse getEnrollmentById(
            Integer userId,
            Integer enrollmentId) {

        Enrollment enrollment = enrollmentRepository
                .findById(enrollmentId)
                .orElseThrow(() ->
                        new RuntimeException("Enrollment not found."));

        if (!enrollment.getStudentUserId().equals(userId)) {

            throw new RuntimeException(
                    "You are not authorized.");
        }

        EnrollmentResponse response =
                new EnrollmentResponse();

        BeanUtils.copyProperties(enrollment, response);

        return response;
    }

    @Override
    public void cancelEnrollment(
            Integer userId,
            Integer enrollmentId) {

        Enrollment enrollment = enrollmentRepository
                .findById(enrollmentId)
                .orElseThrow(() ->
                        new RuntimeException("Enrollment not found."));

        if (!enrollment.getStudentUserId().equals(userId)) {

            throw new RuntimeException(
                    "You are not authorized.");
        }

        enrollment.setStatus(EnrollmentStatus.cancelled);

        enrollmentRepository.save(enrollment);
    }
}