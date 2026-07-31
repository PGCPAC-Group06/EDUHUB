package com.eduhub.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "INSTITUTE_DOCUMENTS")
@Getter
@Setter
public class InstituteDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "document_id")
    private Integer documentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institute_profile_id", nullable = false)
    private InstituteProfile instituteProfile;

    @Column(name = "document_type", nullable = false, length = 50)
    private String documentType;

    @Column(name = "document_name", nullable = false, length = 100)
    private String documentName;

    @Column(name = "document_url", nullable = false)
    private String documentUrl;

    @Column(name = "verification_status", nullable = false)
    private String verificationStatus; // pending, verified, rejected

    @Column(name = "uploaded_at", nullable = false)
    private LocalDateTime uploadedAt;

    @Column(name = "verified_at")
    private LocalDateTime verifiedAt;
}
