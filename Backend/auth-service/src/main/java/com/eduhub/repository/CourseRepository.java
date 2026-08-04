package com.eduhub.repository;

import com.eduhub.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
    List<Course> findByApprovalStatusAndStatus(String approvalStatus, String status);
    List<Course> findByStatus(String status);
}
