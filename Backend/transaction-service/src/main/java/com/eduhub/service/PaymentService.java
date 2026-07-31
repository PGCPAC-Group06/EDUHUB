package com.eduhub.service;


import java.util.List;

import com.eduhub.dto.MakePaymentRequest;
import com.eduhub.dto.PaymentResponse;

public interface PaymentService {

    PaymentResponse makePayment(
            Integer userId,
            MakePaymentRequest request);

    List<PaymentResponse> getMyPayments(
            Integer userId);

    PaymentResponse getPaymentById(
            Integer userId,
            Integer paymentId);
}