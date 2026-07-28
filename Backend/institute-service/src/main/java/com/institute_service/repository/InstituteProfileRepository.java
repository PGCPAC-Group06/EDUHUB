package com.institute_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.institute_service.entity.InstituteProfile;

public interface InstituteProfileRepository extends JpaRepository<InstituteProfile, Integer> {

	Optional<InstituteProfile> findByUserId(Integer userId);
}
