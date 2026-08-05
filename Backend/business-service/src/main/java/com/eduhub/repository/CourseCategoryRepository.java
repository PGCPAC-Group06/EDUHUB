package com.eduhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eduhub.entity.CourseCategory;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.eduhub.entity.CourseCategoryId;

@Repository
public interface CourseCategoryRepository
        extends JpaRepository<CourseCategory, CourseCategoryId> {

    List<CourseCategory> findByIdCourseId(Integer courseId);

}