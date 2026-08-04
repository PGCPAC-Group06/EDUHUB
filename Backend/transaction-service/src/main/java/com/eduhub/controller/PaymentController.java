package com.eduhub.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.MakePaymentRequest;
import com.eduhub.service.PaymentService;

import jakarta.servlet.http.HttpServletRequest;



@RestController
@RequestMapping("/api/payments")
public class PaymentController {


    @Autowired
    private PaymentService paymentService;



    @PostMapping
    public ResponseEntity<?> makePayment(

            HttpServletRequest request,

            @RequestBody MakePaymentRequest paymentRequest) {


        Integer userId =
                (Integer) request.getAttribute("userId");


        return ResponseEntity.ok(
                paymentService.makePayment(
                        userId,
                        paymentRequest
                )
        );
    }



    @GetMapping
    public ResponseEntity<?> getMyPayments(
            HttpServletRequest request) {


        Integer userId =
                (Integer) request.getAttribute("userId");


        return ResponseEntity.ok(
                paymentService.getMyPayments(userId)
        );
    }




    @GetMapping("/{paymentId}")
    public ResponseEntity<?> getPaymentById(

            HttpServletRequest request,

            @PathVariable Integer paymentId) {


        Integer userId =
                (Integer) request.getAttribute("userId");


        return ResponseEntity.ok(
                paymentService.getPaymentById(
                        userId,
                        paymentId
                )
        );
    }

}