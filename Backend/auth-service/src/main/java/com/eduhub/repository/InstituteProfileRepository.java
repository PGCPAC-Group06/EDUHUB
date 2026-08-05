package com.eduhub.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.eduhub.entity.InstituteProfile;
import com.eduhub.entity.User;

public interface InstituteProfileRepository extends JpaRepository<InstituteProfile, Integer> {
    Optional<InstituteProfile> findByUser(User user);
    Optional<InstituteProfile> findByUser_UserId(Integer userId);
}
