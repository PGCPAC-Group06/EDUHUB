package com.institute_service.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.institute_service.dto.InstituteDocumentRequest;
import com.institute_service.dto.InstituteDocumentResponse;
import com.institute_service.entity.InstituteDocument;
import com.institute_service.entity.VerificationStatus;
import com.institute_service.repository.InstituteDocumentRepository;

@Service
public class InstituteDocumentServiceImpl implements InstituteDocumentService {

    @Autowired
    private InstituteDocumentRepository instituteDocumentRepository;


    @Override
    public List<InstituteDocumentResponse> getDocuments(Integer instituteProfileId) {

        List<InstituteDocument> documents =
                instituteDocumentRepository.findByInstituteProfileId(instituteProfileId);

        return documents.stream().map(document -> {

            InstituteDocumentResponse response = new InstituteDocumentResponse();

            BeanUtils.copyProperties(document, response);

            return response;

        }).collect(Collectors.toList());
    }


    @Override
    public InstituteDocumentResponse uploadDocument(
            Integer instituteProfileId,
            InstituteDocumentRequest request) {


        // DEBUG START
        System.out.println("========== DOCUMENT DEBUG ==========");
        System.out.println("Institute Profile Id : " + instituteProfileId);
        System.out.println("Document Type        : " + request.getDocumentType());
        System.out.println("Document Name        : " + request.getDocumentName());
        System.out.println("Document URL         : " + request.getDocumentUrl());
        System.out.println("====================================");


        InstituteDocument document = new InstituteDocument();

        document.setInstituteProfileId(instituteProfileId);
        document.setDocumentType(request.getDocumentType());
        document.setDocumentName(request.getDocumentName());
        document.setDocumentUrl(request.getDocumentUrl());

        document.setVerificationStatus(VerificationStatus.pending);
        document.setUploadedAt(LocalDateTime.now());


        // Entity check
        System.out.println("ENTITY DOCUMENT NAME : " 
                + document.getDocumentName());


        InstituteDocument savedDocument =
                instituteDocumentRepository.save(document);


        InstituteDocumentResponse response =
                new InstituteDocumentResponse();

        BeanUtils.copyProperties(savedDocument, response);


        return response;
    }
}