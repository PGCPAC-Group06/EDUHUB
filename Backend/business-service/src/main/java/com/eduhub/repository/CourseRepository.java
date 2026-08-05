package com.eduhub.repository;

<<<<<<< HEAD

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eduhub.entity.Course;


@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

    List<Course> findByInstituteProfileId(Integer instituteProfileId);

}
=======
import org.springframework.data.jpa.repository.JpaRepository;
import com.eduhub.entity.Course;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    List<Course> findByInstituteProfile_UserId(Integer userId);
}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
