package com.eduhub.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDashboardResponse {

    private Long totalEnrollments;

    private Long activeCourses;

    private Long completedCourses;

    private Long cancelledCourses;

    private Double totalPayments;
}