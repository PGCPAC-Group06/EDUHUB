package com.eduhub.entity;


import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "institute_document")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InstituteDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "document_id")
    private Integer documentId;

    @Column(name = "institute_profile_id", nullable = false)
    private Integer instituteProfileId;

    @Column(name = "document_type", nullable = false)
    private String documentType;

    @Column(name = "document_name", nullable = false)
    private String documentName;

    @Column(name = "document_url", nullable = false)
    private String documentUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false)
    private VerificationStatus verificationStatus;

    @Column(name = "uploaded_at", nullable = false)
    private LocalDateTime uploadedAt;

    @Column(name = "verified_at")
    private LocalDateTime verifiedAt;

    @PrePersist
    public void prePersist() {
        uploadedAt = LocalDateTime.now();

        if (verificationStatus == null) {
            verificationStatus = VerificationStatus.pending;
        }
    }
}