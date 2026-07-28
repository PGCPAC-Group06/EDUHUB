package com.institute_service.service;

import java.time.LocalDateTime;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.institute_service.dto.InstituteProfileRequest;
import com.institute_service.dto.InstituteProfileResponse;
import com.institute_service.entity.InstituteProfile;
import com.institute_service.repository.InstituteProfileRepository;

@Service
public class InstituteProfileServiceImpl implements InstituteProfileService {

    @Autowired
    private InstituteProfileRepository instituteProfileRepository;

    @Override
    public InstituteProfileResponse getProfile(Integer userId) {

        InstituteProfile profile = instituteProfileRepository
                .findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Institute profile not found"));

        InstituteProfileResponse response = new InstituteProfileResponse();

        BeanUtils.copyProperties(profile, response);

        return response;
    }

    @Override
    public InstituteProfileResponse updateProfile(
            Integer userId,
            InstituteProfileRequest request) {

        InstituteProfile profile = instituteProfileRepository
                .findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Institute profile not found"));

        profile.setContactNumber(request.getContactNumber());
        profile.setWebsite(request.getWebsite());
        profile.setAddress(request.getAddress());
        profile.setCity(request.getCity());
        profile.setState(request.getState());
        profile.setPincode(request.getPincode());
        profile.setDescription(request.getDescription());
        profile.setLogoUrl(request.getLogoUrl());

        profile.setUpdatedAt(LocalDateTime.now());

        InstituteProfile updatedProfile =
                instituteProfileRepository.save(profile);

        InstituteProfileResponse response =
                new InstituteProfileResponse();

        BeanUtils.copyProperties(updatedProfile, response);

        return response;
    }
}