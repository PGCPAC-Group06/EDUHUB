package com.eduhub.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eduhub.entity.StudentProfile;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, Integer> {
    Optional<StudentProfile> findByUserId(Integer userId);
}
