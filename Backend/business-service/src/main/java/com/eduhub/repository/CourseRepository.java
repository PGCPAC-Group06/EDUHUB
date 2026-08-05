package com.eduhub.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eduhub.entity.Course;


@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

    List<Course> findByInstituteProfileId(Integer instituteProfileId);

}