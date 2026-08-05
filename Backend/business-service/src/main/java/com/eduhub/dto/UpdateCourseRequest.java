package com.eduhub.dto;


import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCourseRequest {

    @NotNull
    private Integer instructorId;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal price;

    @NotBlank
    private String duration;

    private String thumbnail;

    private Integer categoryId;

    private String status;

    private String approvalStatus;
}