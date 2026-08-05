package com.eduhub.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "platform_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlatformSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "setting_id")
    private Integer settingId;

    @Column(name = "platform_name", nullable = false, length = 100)
    private String platformName;

    @Column(name = "commission_percentage", nullable = false)
    private Double commissionPercentage;

    @Column(name = "support_email", nullable = false, length = 100)
    private String supportEmail;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
