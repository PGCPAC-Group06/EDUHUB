package com.eduhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.eduhub.entity.Course;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    List<Course> findByInstituteProfile_UserId(Integer userId);
}
