package com.eduhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD


import java.util.List;

import org.springframework.stereotype.Repository;

import com.eduhub.entity.Instructor;


@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Integer> {

    List<Instructor> findByInstituteProfileId(Integer instituteProfileId);

}
=======
import com.eduhub.entity.Instructor;

import java.util.List;

public interface InstructorRepository extends JpaRepository<Instructor, Integer> {
    List<Instructor> findByInstituteProfile_UserId(Integer userId);
}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
