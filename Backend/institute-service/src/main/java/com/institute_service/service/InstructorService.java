package com.institute_service.service;

import com.institute_service.dto.InstructorRequest;
import com.institute_service.dto.InstructorResponse;

import java.util.List;

public interface InstructorService {
    InstructorResponse addInstructor(InstructorRequest request);
    InstructorResponse updateInstructor(Integer instructorId, InstructorRequest request);
    InstructorResponse getInstructorById(Integer instructorId);
    List<InstructorResponse> getInstructorsByInstituteProfileId(Integer instituteProfileId);
    List<InstructorResponse> getAllInstructors();
    void deleteInstructor(Integer instructorId);
}
