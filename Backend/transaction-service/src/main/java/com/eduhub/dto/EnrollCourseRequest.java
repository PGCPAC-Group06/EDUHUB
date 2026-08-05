package com.eduhub.dto;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollCourseRequest {

    @NotNull
    private Integer courseId;

    private String paymentMethod;

    private String transactionId;

    private java.math.BigDecimal amount;
}
