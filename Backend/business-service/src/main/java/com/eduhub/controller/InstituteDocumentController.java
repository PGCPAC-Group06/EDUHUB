package com.eduhub.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.UploadDocumentRequest;
import com.eduhub.service.InstituteDocumentService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/institute/documents")
public class InstituteDocumentController {


    @Autowired
    private InstituteDocumentService instituteDocumentService;



    // Upload Document
    @PostMapping
    public ResponseEntity<?> uploadDocument(

            HttpServletRequest request,

            @Valid @RequestBody UploadDocumentRequest documentRequest) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(
                        instituteDocumentService
                        .uploadDocument(
                                userId,
                                documentRequest
                        )
                    );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }





    // Get All Documents
    @GetMapping
    public ResponseEntity<?> getDocuments(

            HttpServletRequest request) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            return ResponseEntity.ok(
                    instituteDocumentService
                    .getDocuments(userId)
            );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }





    // Delete Document
    @DeleteMapping("/{documentId}")
    public ResponseEntity<?> deleteDocument(

            HttpServletRequest request,

            @PathVariable Integer documentId) {


        try {


            Integer userId =
                    (Integer) request.getAttribute("userId");


            instituteDocumentService
                    .deleteDocument(
                            userId,
                            documentId
                    );


            return ResponseEntity.ok(
                    "Document deleted successfully."
            );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

}