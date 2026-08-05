package com.eduhub.service;


import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;



import com.eduhub.dto.MakePaymentRequest;
import com.eduhub.dto.PaymentResponse;

import com.eduhub.entity.Enrollment;
import com.eduhub.entity.Payment;
import com.eduhub.entity.PaymentStatus;

import com.eduhub.repository.EnrollmentRepository;
import com.eduhub.repository.PaymentRepository;
import com.eduhub.entity.RevenueShare;
import com.eduhub.repository.RevenueShareRepository;

@Service
public class PaymentServiceImpl implements PaymentService {


    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private RevenueShareRepository revenueShareRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Autowired
    private EnrollmentRepository enrollmentRepository;



    @Override
    public PaymentResponse makePayment(
            Integer userId,
            MakePaymentRequest request) {



        Enrollment enrollment =
                enrollmentRepository
                .findById(request.getEnrollmentId())

                .orElseThrow(() ->
                        new RuntimeException(
                                "Enrollment not found."
                        ));



        if(!enrollment.getStudentUserId()
                .equals(userId)) {


            throw new RuntimeException(
                    "You are not authorized."
            );
        }



        if(paymentRepository
                .findByEnrollmentId(
                        request.getEnrollmentId()
                )
                .isPresent()) {


            throw new RuntimeException(
                    "Payment already completed."
            );
        }



        Payment payment = new Payment();



        payment.setStudentUserId(userId);

        payment.setCourseId(
                request.getCourseId()
        );


        payment.setEnrollmentId(
                request.getEnrollmentId()
        );


        payment.setTotalAmount(
                request.getTotalAmount()
        );


        payment.setPaymentMethod(
                request.getPaymentMethod()
        );


        payment.setPaymentStatus(
                PaymentStatus.success
        );


        payment.setTransactionId(
                UUID.randomUUID()
                .toString()
        );



        Payment savedPayment =
                paymentRepository.save(payment);

        // Calculate and save revenue share
        Double commissionPercentage = 15.0;
        try {
            Double dbCommission = jdbcTemplate.queryForObject(
                    "SELECT commission_percentage FROM platform_settings LIMIT 1", Double.class);
            if (dbCommission != null) {
                commissionPercentage = dbCommission;
            }
        } catch (Exception e) {
            // Ignore, default to 15.0
        }

        Double paymentAmount = savedPayment.getTotalAmount().doubleValue();
        Double platformShare = paymentAmount * (commissionPercentage / 100.0);
        Double instituteShare = paymentAmount - platformShare;

        RevenueShare revenueShare = new RevenueShare();
        revenueShare.setPaymentId(savedPayment.getPaymentId());
        revenueShare.setPayment(paymentAmount);
        revenueShare.setCommissionPercentage(commissionPercentage);
        revenueShare.setPlatformShare(platformShare);
        revenueShare.setInstituteShare(instituteShare);
        revenueShareRepository.save(revenueShare);


        PaymentResponse response =
                new PaymentResponse();



        BeanUtils.copyProperties(
                savedPayment,
                response
        );


        return response;
    }





    @Override
    public List<PaymentResponse> getMyPayments(
            Integer userId) {



        List<Payment> payments =
                paymentRepository
                .findByStudentUserId(userId);



        return payments.stream()
                .map(payment -> {


                    PaymentResponse response =
                            new PaymentResponse();



                    BeanUtils.copyProperties(
                            payment,
                            response
                    );



                    return response;


                })
                .collect(Collectors.toList());
    }






    @Override
    public PaymentResponse getPaymentById(
            Integer userId,
            Integer paymentId) {



        Payment payment =
                paymentRepository
                .findById(paymentId)

                .orElseThrow(() ->
                        new RuntimeException(
                                "Payment not found."
                        ));




        if(!payment.getStudentUserId()
                .equals(userId)) {


            throw new RuntimeException(
                    "You are not authorized."
            );
        }




        PaymentResponse response =
                new PaymentResponse();



        BeanUtils.copyProperties(
                payment,
                response
        );



        return response;
    }

}