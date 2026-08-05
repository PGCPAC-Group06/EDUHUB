package com.eduhub.service;

import com.eduhub.dto.StudentProfileResponse;
import com.eduhub.dto.UpdateStudentProfileRequest;

public interface StudentProfileService {
    StudentProfileResponse getStudentProfile(Integer userId);
    StudentProfileResponse updateStudentProfile(Integer userId, UpdateStudentProfileRequest request);
}
