package com.eduhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eduhub.entity.PlatformSettings;

@Repository
public interface PlatformSettingsRepository extends JpaRepository<PlatformSettings, Integer> {
}
