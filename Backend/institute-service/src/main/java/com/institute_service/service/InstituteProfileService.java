package com.institute_service.service;

import com.institute_service.dto.InstituteProfileRequest;
import com.institute_service.dto.InstituteProfileResponse;

public interface InstituteProfileService {

    InstituteProfileResponse getProfile(Integer userId);

    InstituteProfileResponse updateProfile(
            Integer userId,
            InstituteProfileRequest request
    );
}