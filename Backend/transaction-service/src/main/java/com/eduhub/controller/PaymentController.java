package com.eduhub.controller;


import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< HEAD
=======
import org.springframework.http.HttpStatus;
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.MakePaymentRequest;
<<<<<<< HEAD
import com.eduhub.service.PaymentService;

import jakarta.servlet.http.HttpServletRequest;


=======
import com.eduhub.jwt.JwtUtil;
import com.eduhub.service.PaymentService;

import jakarta.validation.Valid;
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

<<<<<<< HEAD

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

=======
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
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
}