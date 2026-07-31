package com.eduhub.dto;


import java.time.LocalDateTime;

import com.eduhub.entity.EnrollmentStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentResponse {

    private Integer enrollmentId;

    private Integer studentUserId;

    private Integer courseId;

    private LocalDateTime enrollmentDate;

    private EnrollmentStatus status;

}