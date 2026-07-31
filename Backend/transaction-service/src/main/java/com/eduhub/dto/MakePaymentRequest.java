package com.eduhub.dto;


import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MakePaymentRequest {

    @NotNull
    private Integer enrollmentId;

    @NotNull
    private Integer courseId;

    @NotNull
    private BigDecimal totalAmount;

    @NotBlank
    private String paymentMethod;
}