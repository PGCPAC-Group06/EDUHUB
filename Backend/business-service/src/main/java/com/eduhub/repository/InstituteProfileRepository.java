package com.eduhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.eduhub.entity.InstituteProfile;
import java.util.Optional;

public interface InstituteProfileRepository extends JpaRepository<InstituteProfile, Integer> {
    Optional<InstituteProfile> findByUserId(Integer userId);
}
