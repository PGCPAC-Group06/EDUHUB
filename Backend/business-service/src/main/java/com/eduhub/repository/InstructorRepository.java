package com.eduhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.eduhub.entity.Instructor;

import java.util.List;

public interface InstructorRepository extends JpaRepository<Instructor, Integer> {
    List<Instructor> findByInstituteProfile_UserId(Integer userId);
}
