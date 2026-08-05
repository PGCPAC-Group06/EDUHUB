package com.eduhub.service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eduhub.dto.InstituteDocumentResponse;
import com.eduhub.dto.UploadDocumentRequest;
import com.eduhub.entity.InstituteDocument;
import com.eduhub.entity.InstituteProfile;
import com.eduhub.entity.VerificationStatus;
import com.eduhub.repository.InstituteDocumentRepository;
import com.eduhub.repository.InstituteProfileRepository;



@Service
public class InstituteDocumentServiceImpl implements InstituteDocumentService {

    @Autowired
    private InstituteDocumentRepository instituteDocumentRepository;

    @Autowired
    private InstituteProfileRepository instituteProfileRepository;

    private InstituteProfile getOrAutoCreateProfile(Integer userId) {
        if (userId == null) {
            throw new RuntimeException("User ID is required");
        }
        return instituteProfileRepository.findByUserId(userId).orElseGet(() -> {
            InstituteProfile profile = new InstituteProfile();
            profile.setUserId(userId);
            profile.setGstin("GSTIN-" + userId + "-" + (System.currentTimeMillis() % 100000));
            profile.setContactNo("0000000000");
            profile.setAddress("Campus Address");
            profile.setCity("City");
            profile.setState("State");
            profile.setPincode("000000");
            profile.setDescription("Institute Portal");
            return instituteProfileRepository.save(profile);
        });
    }

    @Override
    public InstituteDocumentResponse uploadDocument(
            Integer userId,
            UploadDocumentRequest request) {

        InstituteProfile profile = getOrAutoCreateProfile(userId);

        InstituteDocument document = new InstituteDocument();

        document.setInstituteProfileId(profile.getInstituteProfileId());
        document.setDocumentType(request.getDocumentType());
        document.setDocumentName(request.getDocumentName());
        document.setDocumentUrl(request.getDocumentUrl());

        document.setVerificationStatus(VerificationStatus.pending);
        document.setUploadedAt(LocalDateTime.now());

        InstituteDocument savedDocument =
                instituteDocumentRepository.save(document);

        InstituteDocumentResponse response =
                new InstituteDocumentResponse();

        BeanUtils.copyProperties(savedDocument, response);

        return response;
    }

    @Override
    public List<InstituteDocumentResponse> getDocuments(Integer userId) {

        InstituteProfile profile = getOrAutoCreateProfile(userId);

        List<InstituteDocument> documents =
                instituteDocumentRepository.findByInstituteProfileId(
                        profile.getInstituteProfileId());

        return documents.stream().map(document -> {

            InstituteDocumentResponse response =
                    new InstituteDocumentResponse();

            BeanUtils.copyProperties(document, response);

            return response;

        }).collect(Collectors.toList());
    }

    @Override
    public void deleteDocument(
            Integer userId,
            Integer documentId) {

        InstituteProfile profile = getOrAutoCreateProfile(userId);

        InstituteDocument document =
                instituteDocumentRepository.findById(documentId)
                        .orElseThrow(() ->
                                new RuntimeException("Document not found"));

        if (!document.getInstituteProfileId()
                .equals(profile.getInstituteProfileId())) {

            throw new RuntimeException(
                    "You are not authorized to delete this document.");
        }

        instituteDocumentRepository.delete(document);
    }
}