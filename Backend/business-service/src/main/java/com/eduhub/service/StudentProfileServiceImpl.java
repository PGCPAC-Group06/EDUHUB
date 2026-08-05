package com.eduhub.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eduhub.dto.StudentProfileResponse;
import com.eduhub.dto.UpdateStudentProfileRequest;
import com.eduhub.entity.StudentProfile;
import com.eduhub.repository.StudentProfileRepository;
import com.eduhub.repository.UserRepository;

@Service
public class StudentProfileServiceImpl implements StudentProfileService {

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public StudentProfileResponse getStudentProfile(Integer userId) {
        StudentProfile profile = studentProfileRepository.findByUserId(userId)
                .orElseGet(() -> {
                    StudentProfile newProfile = new StudentProfile();
                    newProfile.setUserId(userId);
                    return studentProfileRepository.save(newProfile);
                });

        StudentProfileResponse response = new StudentProfileResponse();
        BeanUtils.copyProperties(profile, response);

        userRepository.findById(userId).ifPresent(user -> {
            response.setName(user.getName());
            response.setEmail(user.getEmail());
        });

        return response;
    }

    @Override
    @Transactional
    public StudentProfileResponse updateStudentProfile(Integer userId, UpdateStudentProfileRequest request) {
        StudentProfile profile = studentProfileRepository.findByUserId(userId)
                .orElseGet(() -> {
                    StudentProfile newProfile = new StudentProfile();
                    newProfile.setUserId(userId);
                    return newProfile;
                });

        if (request.getDateOfBirth() != null) profile.setDateOfBirth(request.getDateOfBirth());
        if (request.getGender() != null) profile.setGender(request.getGender());
        if (request.getMobile() != null) profile.setMobile(request.getMobile());
        if (request.getCollegeName() != null) profile.setCollegeName(request.getCollegeName());
        if (request.getDegree() != null) profile.setDegree(request.getDegree());
        if (request.getCity() != null) profile.setCity(request.getCity());
        if (request.getProfilePicture() != null) profile.setProfilePicture(request.getProfilePicture());

        StudentProfile savedProfile = studentProfileRepository.save(profile);

        StudentProfileResponse response = new StudentProfileResponse();
        BeanUtils.copyProperties(savedProfile, response);

        if (request.getName() != null && !request.getName().trim().isEmpty()) {
            userRepository.findById(userId).ifPresent(user -> {
                user.setName(request.getName().trim());
                userRepository.save(user);
                response.setName(user.getName());
                response.setEmail(user.getEmail());
            });
        } else {
            userRepository.findById(userId).ifPresent(user -> {
                response.setName(user.getName());
                response.setEmail(user.getEmail());
            });
        }

        return response;
    }
}
