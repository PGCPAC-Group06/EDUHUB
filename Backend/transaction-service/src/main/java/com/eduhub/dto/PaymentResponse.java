package com.eduhub.dto;

<<<<<<< HEAD
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class PaymentResponse {


    private Integer paymentId;


    private Integer enrollmentId;


    private Integer studentUserId;


    private Integer courseId;


    private Double totalAmount;


    private String paymentMethod;


    private String paymentStatus;


    private LocalDateTime paymentDate;

=======

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.eduhub.entity.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {

    private Integer paymentId;

    private Integer studentUserId;

    private Integer courseId;

    private Integer enrollmentId;

    private BigDecimal totalAmount;

    private PaymentStatus paymentStatus;

    private String paymentMethod;

    private String transactionId;

    private LocalDateTime paymentDate;
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
}