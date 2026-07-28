package com.institute_service.repository;

import com.institute_service.entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Integer> {
    List<Instructor> findByInstituteProfile_InstituteProfileId(Integer instituteProfileId);
}
