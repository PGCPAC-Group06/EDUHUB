package com.eduhub.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eduhub.dto.CategoryDTO;
import com.eduhub.dto.CourseRequestDTO;
import com.eduhub.dto.CourseResponseDTO;
import com.eduhub.entity.Category;
import com.eduhub.entity.Course;
import com.eduhub.entity.InstituteProfile;
import com.eduhub.entity.Instructor;
import com.eduhub.repository.CategoryRepository;
import com.eduhub.repository.CourseRepository;
import com.eduhub.repository.InstituteProfileRepository;
import com.eduhub.repository.InstructorRepository;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private InstituteProfileRepository instituteProfileRepository;

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public CourseResponseDTO createCourse(CourseRequestDTO dto) {
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

        Instructor instructor = instructorRepository.findById(dto.getInstructorId())
                .orElseThrow(() -> new RuntimeException("Instructor not found. Please select an instructor."));

        Course course = new Course();
        course.setInstituteProfile(institute);
        course.setInstructor(instructor);
        course.setTitle(dto.getTitle());
        course.setDescription(dto.getDescription());
        course.setPrice(dto.getPrice());
        course.setDuration(dto.getDuration());
        course.setThumbnail(dto.getThumbnail());
        course.setApprovalStatus("pending");
        course.setStatus(dto.getStatus() != null ? dto.getStatus() : "active");

        if (dto.getCategoryIds() != null && !dto.getCategoryIds().isEmpty()) {
            Set<Category> categories = new HashSet<>(categoryRepository.findAllById(dto.getCategoryIds()));
            course.setCategories(categories);
        }

        course = courseRepository.save(course);
        return mapToDTO(course);
    }

    @Override
    public CourseResponseDTO updateCourse(Integer courseId, CourseRequestDTO dto) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        course.setTitle(dto.getTitle());
        course.setDescription(dto.getDescription());
        course.setPrice(dto.getPrice());
        course.setDuration(dto.getDuration());
        course.setThumbnail(dto.getThumbnail());
        if (dto.getStatus() != null) {
            course.setStatus(dto.getStatus());
        }

        if (dto.getCategoryIds() != null) {
            Set<Category> categories = new HashSet<>(categoryRepository.findAllById(dto.getCategoryIds()));
            course.setCategories(categories);
        }

        course = courseRepository.save(course);
        return mapToDTO(course);
    }

    @Override
    public void deleteCourse(Integer courseId) {
        courseRepository.deleteById(courseId);
    }

    @Override
    public List<CourseResponseDTO> getCoursesByInstituteUserId(Integer instituteUserId) {
        return courseRepository.findByInstituteProfile_UserId(instituteUserId)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<CourseResponseDTO> getAllCourses() {
        return courseRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public void updateCourseApprovalStatus(Integer courseId, String status) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setApprovalStatus(status.toLowerCase());
        courseRepository.save(course);
    }

    private CourseResponseDTO mapToDTO(Course course) {
        CourseResponseDTO dto = new CourseResponseDTO();
        dto.setCourseId(course.getCourseId());
        dto.setInstituteProfileId(course.getInstituteProfile().getUserId());
        dto.setInstructorId(course.getInstructor().getInstructorId());
        dto.setInstructorName(course.getInstructor().getName());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setPrice(course.getPrice());
        dto.setDuration(course.getDuration());
        dto.setThumbnail(course.getThumbnail());
        dto.setApprovalStatus(course.getApprovalStatus());
        dto.setStatus(course.getStatus());

        if (course.getCategories() != null) {
            dto.setCategories(course.getCategories().stream()
                    .map(c -> new CategoryDTO(c.getCategoryId(), c.getCategoryName()))
                    .collect(Collectors.toList()));
        }
        return dto;
    }
}
