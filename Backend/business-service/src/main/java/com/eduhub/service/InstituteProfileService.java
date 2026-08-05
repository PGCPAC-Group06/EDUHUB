package com.eduhub.service;

import com.eduhub.dto.CreateInstituteProfileRequest;
import com.eduhub.dto.InstituteProfileResponse;
import com.eduhub.dto.UpdateInstituteProfileRequest;

import java.util.List;
import java.util.Map;

public interface InstituteProfileService {
    
	InstituteProfileResponse createProfile(
	        Integer userId,
	        CreateInstituteProfileRequest request
	);

	InstituteProfileResponse getProfile(Integer userId);

	InstituteProfileResponse updateProfile(
	        Integer userId,
	        UpdateInstituteProfileRequest request
	);

    List<InstituteProfileResponse> getAllProfiles();

    Map<String, Object> getDashboardSummary(Integer userId);

    List<Map<String, Object>> getStudents(Integer userId);
}
