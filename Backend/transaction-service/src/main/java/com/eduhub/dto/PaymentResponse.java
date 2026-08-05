package com.eduhub.dto;

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

}