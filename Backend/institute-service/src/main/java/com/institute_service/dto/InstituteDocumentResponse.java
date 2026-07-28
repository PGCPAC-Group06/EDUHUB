package com.institute_service.dto;

import java.time.LocalDateTime;

import com.institute_service.entity.VerificationStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
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