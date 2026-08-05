package com.eduhub.service;


import java.util.List;

import com.eduhub.dto.MakePaymentRequest;
import com.eduhub.dto.PaymentResponse;

<<<<<<< HEAD

public interface PaymentService {


    PaymentResponse makePayment(
            Integer userId,
            MakePaymentRequest request
    );


    List<PaymentResponse> getMyPayments(
            Integer userId
    );


    PaymentResponse getPaymentById(
            Integer userId,
            Integer paymentId
    );

=======
public interface PaymentService {

    PaymentResponse makePayment(
            Integer userId,
            MakePaymentRequest request);

    List<PaymentResponse> getMyPayments(
            Integer userId);

    PaymentResponse getPaymentById(
            Integer userId,
            Integer paymentId);
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
}