package com.eduhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.eduhub.entity.InstituteDocument;


@Repository
public interface InstituteDocumentRepository extends JpaRepository<InstituteDocument, Integer> {

    List<InstituteDocument> findByInstituteProfileId(Integer instituteProfileId);

}