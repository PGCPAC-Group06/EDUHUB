package com.institute_service.service;

import java.util.List;

import com.institute_service.dto.InstituteDocumentRequest;
import com.institute_service.dto.InstituteDocumentResponse;

public interface InstituteDocumentService {

    List<InstituteDocumentResponse> getDocuments(Integer instituteProfileId);

    InstituteDocumentResponse uploadDocument(
            Integer instituteProfileId,
            InstituteDocumentRequest request
    );

}