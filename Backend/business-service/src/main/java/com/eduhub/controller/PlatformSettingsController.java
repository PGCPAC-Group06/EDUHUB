package com.eduhub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.entity.PlatformSettings;
import com.eduhub.service.PlatformSettingsService;

@RestController
@RequestMapping("/api/admin/settings")
public class PlatformSettingsController {

    @Autowired
    private PlatformSettingsService platformSettingsService;

    @GetMapping
    public ResponseEntity<?> getSettings() {
        try {
            return ResponseEntity.ok(platformSettingsService.getSettings());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> updateSettings(@RequestBody PlatformSettings request) {
        try {
            return ResponseEntity.ok(platformSettingsService.updateSettings(request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
