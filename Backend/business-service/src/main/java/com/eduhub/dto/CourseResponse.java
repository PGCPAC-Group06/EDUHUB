package com.eduhub.dto;


import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponse {

    private Integer courseId;

    private Integer instituteProfileId;

    private Integer instructorId;

    private String title;

    private String description;

    private BigDecimal price;

    private String duration;

    private String thumbnail;

    private String status;

    private String approvalStatus;

    private Integer categoryId;

    private String category;

    private String instructorName;

    @JsonProperty("course_id")
    public Integer getCourse_id() { return courseId; }

    @JsonProperty("approval_status")
    public String getApproval_status() { return approvalStatus != null ? approvalStatus : "pending"; }

    @JsonProperty("instructor_id")
    public Integer getInstructor_id() { return instructorId; }
}