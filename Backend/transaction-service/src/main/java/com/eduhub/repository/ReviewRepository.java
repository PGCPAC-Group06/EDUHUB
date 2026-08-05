package com.eduhub.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eduhub.entity.Review;

@Repository
public interface ReviewRepository
        extends JpaRepository<Review, Integer> {

    Optional<Review> findByEnrollmentId(
            Integer enrollmentId);

    List<Review> findAllByEnrollmentId(
            Integer enrollmentId);
}