package com.eduhub.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.MakePaymentRequest;
import com.eduhub.jwt.JwtUtil;
import com.eduhub.service.PaymentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private JwtUtil jwtUtil;

    // Make Payment
    @PostMapping
    public ResponseEntity<?> makePayment(
            @RequestHeader("Authorization") String authorizationHeader,
            @Valid @RequestBody MakePaymentRequest request) {

        try {

            String token = authorizationHeader.substring(7);

            Integer userId = jwtUtil.extractUserId(token);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(paymentService.makePayment(userId, request));

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get My Payments
    @GetMapping
    public ResponseEntity<?> getMyPayments(
            @RequestHeader("Authorization") String authorizationHeader) {

        try {

            String token = authorizationHeader.substring(7);

            Integer userId = jwtUtil.extractUserId(token);

            return ResponseEntity.ok(
                    paymentService.getMyPayments(userId));

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get Payment By Id
    @GetMapping("/{paymentId}")
    public ResponseEntity<?> getPaymentById(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Integer paymentId) {

        try {

            String token = authorizationHeader.substring(7);

            Integer userId = jwtUtil.extractUserId(token);

            return ResponseEntity.ok(
                    paymentService.getPaymentById(
                            userId,
                            paymentId));

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}