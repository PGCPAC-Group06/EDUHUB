package com.institute_service.service;

import com.institute_service.dto.InstructorRequest;
import com.institute_service.dto.InstructorResponse;
import com.institute_service.entity.InstituteProfile;
import com.institute_service.entity.Instructor;
import com.institute_service.repository.InstituteProfileRepository;
import com.institute_service.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstructorServiceImpl implements InstructorService {

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private InstituteProfileRepository instituteProfileRepository;

    @Override
    public InstructorResponse addInstructor(InstructorRequest request) {
        InstituteProfile instituteProfile = instituteProfileRepository.findById(request.getInstituteProfileId())
                .orElseThrow(() -> new RuntimeException("Institute Profile not found with ID: " + request.getInstituteProfileId()));

        Instructor instructor = new Instructor();
        instructor.setInstituteProfile(instituteProfile);
        instructor.setName(request.getName());
        instructor.setSpecialization(request.getSpecialization());
        instructor.setExperience(request.getExperience());
        instructor.setBio(request.getBio());
        instructor.setPhoto(request.getPhoto());

        Instructor saved = instructorRepository.save(instructor);
        return mapToResponse(saved);
    }

    @Override
    public InstructorResponse updateInstructor(Integer instructorId, InstructorRequest request) {
        Instructor instructor = instructorRepository.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("Instructor not found with ID: " + instructorId));

        instructor.setName(request.getName());
        instructor.setSpecialization(request.getSpecialization());
        instructor.setExperience(request.getExperience());
        instructor.setBio(request.getBio());
        if (request.getPhoto() != null) {
            instructor.setPhoto(request.getPhoto());
        }

        Instructor saved = instructorRepository.save(instructor);
        return mapToResponse(saved);
    }

    @Override
    public InstructorResponse getInstructorById(Integer instructorId) {
        Instructor instructor = instructorRepository.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("Instructor not found with ID: " + instructorId));
        return mapToResponse(instructor);
    }

    @Override
    public List<InstructorResponse> getInstructorsByInstituteProfileId(Integer instituteProfileId) {
        return instructorRepository.findByInstituteProfile_InstituteProfileId(instituteProfileId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<InstructorResponse> getAllInstructors() {
        return instructorRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void deleteInstructor(Integer instructorId) {
        if (!instructorRepository.existsById(instructorId)) {
            throw new RuntimeException("Instructor not found with ID: " + instructorId);
        }
        instructorRepository.deleteById(instructorId);
    }

    private InstructorResponse mapToResponse(Instructor instructor) {
        return new InstructorResponse(
                instructor.getInstructorId(),
                instructor.getInstituteProfile() != null ? instructor.getInstituteProfile().getInstituteProfileId() : null,
                instructor.getName(),
                instructor.getSpecialization(),
                instructor.getExperience(),
                instructor.getBio(),
                instructor.getPhoto()
        );
    }
}
