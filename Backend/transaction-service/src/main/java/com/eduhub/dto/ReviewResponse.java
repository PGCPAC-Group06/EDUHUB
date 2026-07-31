package com.eduhub.dto;


import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {

    private Integer reviewId;

    private Integer enrollmentId;

    private Integer rating;

    private String comment;

    private LocalDateTime createdAt;
}