package com.institute_service.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "institute_document")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class InstituteDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "document_id")
    private Integer documentId;

    @Column(name = "institute_profile_id", nullable = false)
    private Integer instituteProfileId;

    @Column(name = "document_type", nullable = false, length = 50)
    private String documentType;

    @Column(name = "document_name", nullable = false, length = 100)
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
}
