package com.eduhub.dto;



import lombok.Data;


@Data
public class PaymentRequest {


    private Integer enrollmentId;


    private Integer courseId;


    private Double totalAmount;


    private String paymentMethod;

}