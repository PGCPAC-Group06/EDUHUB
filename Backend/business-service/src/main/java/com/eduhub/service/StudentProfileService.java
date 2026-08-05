package com.eduhub.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eduhub.dto.UpdateStudentProfileRequest;
import com.eduhub.entity.StudentProfile;
import com.eduhub.repository.StudentProfileRepository;

@Service
public class StudentProfileService {

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    public StudentProfile getProfile(Integer userId) {
        Optional<StudentProfile> optProfile = studentProfileRepository.findByUserId(userId);
        if (optProfile.isPresent()) {
            return optProfile.get();
        } else {
            // Create a default empty profile for the user if it doesn't exist yet
            StudentProfile newProfile = new StudentProfile();
            newProfile.setUserId(userId);
            return studentProfileRepository.save(newProfile);
        }
    }

    public StudentProfile updateProfile(Integer userId, UpdateStudentProfileRequest request) {
        StudentProfile profile = getProfile(userId);
        
        if(request.getDateOfBirth() != null) {
            profile.setDateOfBirth(request.getDateOfBirth());
        }
        if(request.getGender() != null) {
            profile.setGender(request.getGender());
        }
        if(request.getMobile() != null) {
            profile.setMobile(request.getMobile());
        }
        if(request.getCollegeName() != null) {
            profile.setCollegeName(request.getCollegeName());
        }
        if(request.getDegree() != null) {
            profile.setDegree(request.getDegree());
        }
        if(request.getCity() != null) {
            profile.setCity(request.getCity());
        }
        if(request.getProfilePicture() != null) {
            profile.setProfilePicture(request.getProfilePicture());
        }

        return studentProfileRepository.save(profile);
    }
}
