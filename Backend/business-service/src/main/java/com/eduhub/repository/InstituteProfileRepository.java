package com.eduhub.repository;

<<<<<<< HEAD

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
=======
import org.springframework.data.jpa.repository.JpaRepository;
import com.eduhub.entity.InstituteProfile;
import java.util.Optional;

public interface InstituteProfileRepository extends JpaRepository<InstituteProfile, Integer> {
    Optional<InstituteProfile> findByUserId(Integer userId);
}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
