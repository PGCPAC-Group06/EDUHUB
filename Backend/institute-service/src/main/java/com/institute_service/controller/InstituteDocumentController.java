package com.institute_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.institute_service.dto.InstituteDocumentRequest;
import com.institute_service.dto.InstituteDocumentResponse;
import com.institute_service.service.InstituteDocumentService;

@RestController
@RequestMapping("/api/institute/documents")
public class InstituteDocumentController {

    @Autowired
    private InstituteDocumentService instituteDocumentService;

    // View all documents
    @GetMapping("/{instituteProfileId}")
    public ResponseEntity<List<InstituteDocumentResponse>> getDocuments(
            @PathVariable Integer instituteProfileId) {

        return ResponseEntity.ok(
                instituteDocumentService.getDocuments(instituteProfileId));
    }

    // Upload document
    @PostMapping("/{instituteProfileId}")
    public ResponseEntity<InstituteDocumentResponse> uploadDocument(
            @PathVariable Integer instituteProfileId,
            @RequestBody InstituteDocumentRequest request) {

        return ResponseEntity.ok(
                instituteDocumentService.uploadDocument(
                        instituteProfileId,
                        request));
    }
}