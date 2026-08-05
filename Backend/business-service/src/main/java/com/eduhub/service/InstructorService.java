package com.eduhub.service;


import java.util.List;

import com.eduhub.dto.CreateInstructorRequest;
import com.eduhub.dto.InstructorResponse;
import com.eduhub.dto.UpdateInstructorRequest;


public interface InstructorService {

    InstructorResponse createInstructor(
            Integer userId,
            CreateInstructorRequest request);

    List<InstructorResponse> getAllInstructors(
            Integer userId);

    InstructorResponse getInstructorById(
            Integer userId,
            Integer instructorId);

    InstructorResponse updateInstructor(
            Integer userId,
            Integer instructorId,
            UpdateInstructorRequest request);

    void deleteInstructor(
            Integer userId,
            Integer instructorId);
}