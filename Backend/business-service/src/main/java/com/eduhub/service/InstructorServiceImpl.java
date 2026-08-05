package com.eduhub.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.eduhub.dto.CreateInstructorRequest;
import com.eduhub.dto.InstructorResponse;
import com.eduhub.dto.UpdateInstructorRequest;
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

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String DEFAULT_PHOTO = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

    private InstituteProfile getOrAutoCreateProfile(Integer userId) {
        if (userId == null) {
            throw new RuntimeException("User ID is required");
        }
        return instituteProfileRepository.findByUserId(userId).orElseGet(() -> {
            InstituteProfile profile = new InstituteProfile();
            profile.setUserId(userId);
            profile.setGstin("GSTIN-" + userId + "-" + (System.currentTimeMillis() % 100000));
            profile.setContactNo("0000000000");
            profile.setAddress("Campus Address");
            profile.setCity("City");
            profile.setState("State");
            profile.setPincode("000000");
            profile.setDescription("Institute Portal");
            return instituteProfileRepository.save(profile);
        });
    }

    @Override
    public InstructorResponse createInstructor(
            Integer userId,
            CreateInstructorRequest request) {

        InstituteProfile profile = getOrAutoCreateProfile(userId);

        Instructor instructor = new Instructor();

        instructor.setInstituteProfileId(profile.getInstituteProfileId());
        instructor.setName(request.getName());
        instructor.setSpecialization(request.getSpecialization());
        instructor.setExperience(request.getExperience());
        instructor.setBio(request.getBio());
        if (request.getPhoto() == null || request.getPhoto().trim().isEmpty()) {
            instructor.setPhoto(DEFAULT_PHOTO);
        } else {
            instructor.setPhoto(request.getPhoto().trim());
        }

        Instructor savedInstructor = instructorRepository.save(instructor);

        InstructorResponse response = new InstructorResponse();

        BeanUtils.copyProperties(savedInstructor, response);

        return response;
    }

    @Override
    public List<InstructorResponse> getAllInstructors(Integer userId) {

        InstituteProfile profile = getOrAutoCreateProfile(userId);

        // Automatically replace existing missing or gendered default photos in the database with the gender-neutral avatar
        jdbcTemplate.update(
                "UPDATE instructor SET photo = ? WHERE institute_profile_id = ? AND (photo IS NULL OR TRIM(photo) = '' OR photo LIKE '%unsplash.com%' OR photo NOT LIKE 'http%')",
                DEFAULT_PHOTO, profile.getInstituteProfileId());

        List<Instructor> instructors =
                instructorRepository.findByInstituteProfileId(
                        profile.getInstituteProfileId());

        if (instructors.isEmpty()) {
            Instructor defaultInst = new Instructor();
            defaultInst.setInstituteProfileId(profile.getInstituteProfileId());
            defaultInst.setName("Default Instructor");
            defaultInst.setSpecialization("General Curriculum");
            defaultInst.setExperience(5);
            defaultInst.setBio("Default faculty profile for newly created courses.");
            defaultInst.setPhoto(DEFAULT_PHOTO);
            defaultInst = instructorRepository.save(defaultInst);
            instructors.add(defaultInst);
        }

        return instructors.stream().map(instructor -> {

            InstructorResponse response = new InstructorResponse();

            BeanUtils.copyProperties(instructor, response);

            return response;

        }).collect(Collectors.toList());
    }

    @Override
    public InstructorResponse getInstructorById(
            Integer userId,
            Integer instructorId) {

        InstituteProfile profile = getOrAutoCreateProfile(userId);

        Instructor instructor = instructorRepository.findById(instructorId)
                .orElseThrow(() ->
                        new RuntimeException("Instructor not found"));

        if (!instructor.getInstituteProfileId()
                .equals(profile.getInstituteProfileId())) {

            throw new RuntimeException(
                    "You are not authorized to access this instructor.");
        }

        InstructorResponse response = new InstructorResponse();

        BeanUtils.copyProperties(instructor, response);

        return response;
    }

    @Override
    public InstructorResponse updateInstructor(
            Integer userId,
            Integer instructorId,
            UpdateInstructorRequest request) {

        InstituteProfile profile = getOrAutoCreateProfile(userId);

        Instructor instructor = instructorRepository.findById(instructorId)
                .orElseThrow(() ->
                        new RuntimeException("Instructor not found"));

        if (!instructor.getInstituteProfileId()
                .equals(profile.getInstituteProfileId())) {

            throw new RuntimeException(
                    "You are not authorized to update this instructor.");
        }

        instructor.setName(request.getName());
        instructor.setSpecialization(request.getSpecialization());
        instructor.setExperience(request.getExperience());
        instructor.setBio(request.getBio());
        if (request.getPhoto() == null || request.getPhoto().trim().isEmpty()) {
            instructor.setPhoto(DEFAULT_PHOTO);
        } else {
            instructor.setPhoto(request.getPhoto().trim());
        }

        Instructor updatedInstructor =
                instructorRepository.save(instructor);

        InstructorResponse response = new InstructorResponse();

        BeanUtils.copyProperties(updatedInstructor, response);

        return response;
    }

    @Override
    public void deleteInstructor(
            Integer userId,
            Integer instructorId) {

        InstituteProfile profile = getOrAutoCreateProfile(userId);

        Instructor instructor = instructorRepository.findById(instructorId)
                .orElseThrow(() ->
                        new RuntimeException("Instructor not found"));

        if (!instructor.getInstituteProfileId()
                .equals(profile.getInstituteProfileId())) {

            throw new RuntimeException(
                    "You are not authorized to delete this instructor.");
        }

        instructorRepository.delete(instructor);
    }
}