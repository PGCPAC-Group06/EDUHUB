package com.eduhub.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eduhub.dto.InstructorDTO;
import com.eduhub.entity.InstituteProfile;
import com.eduhub.entity.Instructor;
import com.eduhub.repository.InstituteProfileRepository;
import com.eduhub.repository.InstructorRepository;

@Service
public class InstructorServiceImpl implements InstructorService {

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private InstituteProfileRepository instituteProfileRepository;

    @Override
    public InstructorDTO createInstructor(InstructorDTO dto) {
        InstituteProfile institute = instituteProfileRepository.findByUserId(dto.getInstituteProfileId())
                .orElseGet(() -> {
                    InstituteProfile newProfile = new InstituteProfile();
                    newProfile.setUserId(dto.getInstituteProfileId());
                    newProfile.setAddress("Default Address");
                    newProfile.setGstin("GST-" + System.currentTimeMillis());
                    newProfile.setContactNo("0000000000");
                    newProfile.setDescription("Default Institute Description");
                    return instituteProfileRepository.save(newProfile);
                });

        Instructor instructor = new Instructor();
        instructor.setInstituteProfile(institute);
        instructor.setName(dto.getName());
        instructor.setSpecialization(dto.getSpecialization());
        instructor.setExperience(dto.getExperience());
        instructor.setBio(dto.getBio());
        instructor.setPhoto(dto.getPhoto());

        instructor = instructorRepository.save(instructor);
        return mapToDTO(instructor);
    }

    @Override
    public InstructorDTO updateInstructor(Integer instructorId, InstructorDTO dto) {
        Instructor instructor = instructorRepository.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        instructor.setName(dto.getName());
        instructor.setSpecialization(dto.getSpecialization());
        instructor.setExperience(dto.getExperience());
        instructor.setBio(dto.getBio());
        instructor.setPhoto(dto.getPhoto());

        instructor = instructorRepository.save(instructor);
        return mapToDTO(instructor);
    }

    @Override
    public void deleteInstructor(Integer instructorId) {
        instructorRepository.deleteById(instructorId);
    }

    @Override
    public List<InstructorDTO> getInstructorsByInstituteUserId(Integer instituteUserId) {
        return instructorRepository.findByInstituteProfile_UserId(instituteUserId)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private InstructorDTO mapToDTO(Instructor instructor) {
        InstructorDTO dto = new InstructorDTO();
        dto.setInstructorId(instructor.getInstructorId());
        dto.setInstituteProfileId(instructor.getInstituteProfile().getUserId());
        dto.setName(instructor.getName());
        dto.setSpecialization(instructor.getSpecialization());
        dto.setExperience(instructor.getExperience());
        dto.setBio(instructor.getBio());
        dto.setPhoto(instructor.getPhoto());
        return dto;
    }
}
