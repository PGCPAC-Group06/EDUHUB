package com.eduhub.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eduhub.entity.Enrollment;

@Repository
public interface EnrollmentRepository
        extends JpaRepository<Enrollment, Integer> {

	
    List<Enrollment> findByStudentUserId(Integer studentUserId);

    Optional<Enrollment> findByStudentUserIdAndCourseId(
            Integer studentUserId,
            Integer courseId);

    List<Enrollment> findByCourseId(Integer courseId);
}