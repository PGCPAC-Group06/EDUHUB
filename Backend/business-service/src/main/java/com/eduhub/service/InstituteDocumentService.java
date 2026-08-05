package com.eduhub.service;


import java.util.List;

import com.eduhub.dto.InstituteDocumentResponse;
import com.eduhub.dto.UploadDocumentRequest;



public interface InstituteDocumentService {

    InstituteDocumentResponse uploadDocument(
            Integer userId,
            UploadDocumentRequest request);

    List<InstituteDocumentResponse> getDocuments(
            Integer userId);

    void deleteDocument(
            Integer userId,
            Integer documentId);
}