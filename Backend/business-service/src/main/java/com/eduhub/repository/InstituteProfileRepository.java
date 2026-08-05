package com.eduhub.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eduhub.entity.InstituteProfile;


@Repository
public interface InstituteProfileRepository extends JpaRepository<InstituteProfile, Integer> {

    // Find profile by User ID
    Optional<InstituteProfile> findByUserId(Integer userId);

    // Check if profile already exists for a user
    boolean existsByUserId(Integer userId);

    // Check if GSTIN already exists
    boolean existsByGstin(String gstin);
}