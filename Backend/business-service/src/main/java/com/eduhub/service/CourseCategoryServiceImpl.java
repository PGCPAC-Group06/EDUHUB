package com.eduhub.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eduhub.dto.AssignCategoryRequest;
import com.eduhub.entity.Course;
import com.eduhub.entity.CourseCategory;
import com.eduhub.entity.CourseCategoryId;
import com.eduhub.entity.InstituteProfile;
import com.eduhub.repository.CategoryRepository;
import com.eduhub.repository.CourseCategoryRepository;
import com.eduhub.repository.CourseRepository;
import com.eduhub.repository.InstituteProfileRepository;

@Service
public class CourseCategoryServiceImpl
        implements CourseCategoryService {

    @Autowired
    private CourseCategoryRepository courseCategoryRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private InstituteProfileRepository instituteProfileRepository;

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
    public String assignCategory(
            Integer userId,
            AssignCategoryRequest request) {

        InstituteProfile profile = getOrAutoCreateProfile(userId);

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() ->
                        new RuntimeException("Course not found"));

        if (!course.getInstituteProfileId()
                .equals(profile.getInstituteProfileId())) {

            throw new RuntimeException(
                    "You are not authorized.");
        }

        categoryRepository.findById(request.getCategoryId())
        .orElseThrow(() ->
                new RuntimeException("Category not found"));

CourseCategoryId id = new CourseCategoryId(
        course.getCourseId(),
        request.getCategoryId());

        if (courseCategoryRepository.existsById(id)) {

            throw new RuntimeException(
                    "Category already assigned.");
        }

        CourseCategory mapping = new CourseCategory();

        mapping.setId(id);

        courseCategoryRepository.save(mapping);

        return "Category assigned successfully.";
    }

    @Override
    public String removeCategory(
            Integer userId,
            AssignCategoryRequest request) {

        InstituteProfile profile = getOrAutoCreateProfile(userId);

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() ->
                        new RuntimeException("Course not found"));

        if (!course.getInstituteProfileId()
                .equals(profile.getInstituteProfileId())) {

            throw new RuntimeException(
                    "You are not authorized.");
        }

        CourseCategoryId id = new CourseCategoryId(
                request.getCourseId(),
                request.getCategoryId());

        if (!courseCategoryRepository.existsById(id)) {
            throw new RuntimeException("Category is not assigned to this course.");
        }

        courseCategoryRepository.deleteById(id);

        return "Category removed successfully.";
    }

    @Override
    public List<Integer> getCategoriesByCourse(
            Integer userId,
            Integer courseId) {

        InstituteProfile profile = getOrAutoCreateProfile(userId);

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() ->
                        new RuntimeException("Course not found"));

        if (!course.getInstituteProfileId()
                .equals(profile.getInstituteProfileId())) {

            throw new RuntimeException(
                    "You are not authorized.");
        }

        return courseCategoryRepository
                .findByIdCourseId(courseId)
                .stream()
                .map(c -> c.getId().getCategoryId())
                .collect(Collectors.toList());
    }
}