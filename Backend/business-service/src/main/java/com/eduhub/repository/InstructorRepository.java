package com.eduhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.eduhub.entity.Instructor;


@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Integer> {

    List<Instructor> findByInstituteProfileId(Integer instituteProfileId);

}