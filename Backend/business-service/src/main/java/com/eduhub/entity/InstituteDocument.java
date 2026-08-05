package com.eduhub.entity;

<<<<<<< HEAD

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
=======
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "INSTITUTE_DOCUMENTS")
@Getter
@Setter
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
public class InstituteDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "document_id")
    private Integer documentId;

<<<<<<< HEAD
    @Column(name = "institute_profile_id", nullable = false)
    private Integer instituteProfileId;

    @Column(name = "document_type", nullable = false)
    private String documentType;

    @Column(name = "document_name", nullable = false)
=======
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institute_profile_id", nullable = false)
    private InstituteProfile instituteProfile;

    @Column(name = "document_type", nullable = false, length = 50)
    private String documentType;

    @Column(name = "document_name", nullable = false, length = 100)
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
    private String documentName;

    @Column(name = "document_url", nullable = false)
    private String documentUrl;

<<<<<<< HEAD
    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false)
    private VerificationStatus verificationStatus;
=======
    @Column(name = "verification_status", nullable = false)
    private String verificationStatus; // pending, verified, rejected
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a

    @Column(name = "uploaded_at", nullable = false)
    private LocalDateTime uploadedAt;

    @Column(name = "verified_at")
    private LocalDateTime verifiedAt;
<<<<<<< HEAD

    @PrePersist
    public void prePersist() {
        uploadedAt = LocalDateTime.now();

        if (verificationStatus == null) {
            verificationStatus = VerificationStatus.pending;
        }
    }
}
=======
}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
