package com.institute_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InstituteDocumentRequest {

    private String documentType;
    private String documentName;
    private String documentUrl;

}