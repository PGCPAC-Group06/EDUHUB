package com.eduhub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eduhub.entity.PlatformSettings;
import com.eduhub.repository.PlatformSettingsRepository;

@Service
public class PlatformSettingsService {

    @Autowired
    private PlatformSettingsRepository platformSettingsRepository;

    public PlatformSettings getSettings() {
        // Assume there's only one row for settings
        return platformSettingsRepository.findAll().stream().findFirst().orElseGet(() -> {
            PlatformSettings defaultSettings = new PlatformSettings();
            defaultSettings.setPlatformName("EduHub Platform");
            defaultSettings.setCommissionPercentage(15.0);
            defaultSettings.setSupportEmail("support@eduhub.com");
            return platformSettingsRepository.save(defaultSettings);
        });
    }

    public PlatformSettings updateSettings(PlatformSettings request) {
        PlatformSettings settings = getSettings();
        if(request.getPlatformName() != null) {
            settings.setPlatformName(request.getPlatformName());
        }
        if(request.getCommissionPercentage() != null) {
            settings.setCommissionPercentage(request.getCommissionPercentage());
        }
        if(request.getSupportEmail() != null) {
            settings.setSupportEmail(request.getSupportEmail());
        }
        return platformSettingsRepository.save(settings);
    }
}
