package com.eduhub.service;


import com.eduhub.dto.StudentDashboardResponse;

public interface DashboardService {

    StudentDashboardResponse getStudentDashboard(
            Integer userId);
} 