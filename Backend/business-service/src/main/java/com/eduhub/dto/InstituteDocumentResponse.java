package com.eduhub.dto;


import java.time.LocalDateTime;

import com.eduhub.entity.VerificationStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InstituteDocumentResponse {

    private Integer documentId;

    private Integer instituteProfileId;

    private String documentType;

    private String documentName;

    private String documentUrl;

    private VerificationStatus verificationStatus;

    private LocalDateTime uploadedAt;

    private LocalDateTime verifiedAt;
}