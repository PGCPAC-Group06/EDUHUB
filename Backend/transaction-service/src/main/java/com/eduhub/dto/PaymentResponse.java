package com.eduhub.dto;


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
}