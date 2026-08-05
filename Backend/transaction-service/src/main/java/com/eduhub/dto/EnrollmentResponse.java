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

    private String courseTitle;

    private String category;

    private String instituteName;

    private String thumbnail;

    private Integer progress;

    private java.math.BigDecimal price;

    @com.fasterxml.jackson.annotation.JsonProperty("course_id")
    public Integer getCourse_id() { return courseId; }

    @com.fasterxml.jackson.annotation.JsonProperty("course")
    public java.util.Map<String, Object> getCourse() {
        java.util.Map<String, Object> map = new java.util.HashMap<>();
        map.put("course_id", courseId);
        map.put("courseId", courseId);
        map.put("title", courseTitle != null ? courseTitle : "Course #" + courseId);
        map.put("category_name", category != null ? category : "General");
        map.put("institute_name", instituteName != null ? instituteName : "EduHub Institute");
        map.put("thumbnail", thumbnail != null ? thumbnail : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500");
        map.put("price", price != null ? price : java.math.BigDecimal.ZERO);
        return map;
    }

    public Integer getProgress() {
        return progress != null ? progress : 75;
    }
}