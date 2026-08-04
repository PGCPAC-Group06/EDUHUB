package com.eduhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.eduhub.entity.Payment;

@Repository
public interface PaymentRepository
        extends JpaRepository<Payment, Integer> {

    List<Payment> findByStudentUserId(Integer studentUserId);

    Optional<Payment> findByEnrollmentId(Integer enrollmentId);

    Optional<Payment> findByTransactionId(String transactionId);
}
