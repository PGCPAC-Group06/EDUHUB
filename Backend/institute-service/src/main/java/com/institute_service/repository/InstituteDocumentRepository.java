package com.institute_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.institute_service.entity.InstituteDocument;

public interface InstituteDocumentRepository
extends JpaRepository<InstituteDocument, Integer> {

List<InstituteDocument> findByInstituteProfileId(Integer instituteProfileId);

}