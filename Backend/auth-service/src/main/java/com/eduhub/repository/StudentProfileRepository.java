package com.eduhub.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.eduhub.entity.StudentProfile;
import com.eduhub.entity.User;

public interface StudentProfileRepository extends JpaRepository<StudentProfile, Integer> {
    Optional<StudentProfile> findByUser(User user);
    Optional<StudentProfile> findByUser_UserId(Integer userId);
}
