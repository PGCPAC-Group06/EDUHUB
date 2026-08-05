package com.eduhub.service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eduhub.dto.CourseResponse;
import com.eduhub.dto.CreateCourseRequest;
import com.eduhub.dto.UpdateCourseRequest;
import com.eduhub.entity.Course;
import com.eduhub.entity.InstituteProfile;
import com.eduhub.entity.Instructor;
import com.eduhub.entity.Category;
import com.eduhub.entity.CourseCategory;
import com.eduhub.entity.CourseCategoryId;
import com.eduhub.repository.CourseRepository;
import com.eduhub.repository.InstituteProfileRepository;
import com.eduhub.repository.InstructorRepository;
import com.eduhub.repository.CategoryRepository;
import com.eduhub.repository.CourseCategoryRepository;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;

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

    @Autowired
    private CourseCategoryRepository courseCategoryRepository;

    private void populateCategoryAndInstructor(Course course, CourseResponse response) {
        if (response.getApprovalStatus() == null) {
            response.setApprovalStatus("pending");
        }
        if (response.getStatus() == null) {
            response.setStatus("ACTIVE");
        }
        List<CourseCategory> ccList = courseCategoryRepository.findByIdCourseId(course.getCourseId());
        if (ccList != null && !ccList.isEmpty()) {
            Integer catId = ccList.get(0).getId().getCategoryId();
            response.setCategoryId(catId);
            categoryRepository.findById(catId).ifPresent(cat -> response.setCategory(cat.getCategoryName()));
        } else {
            response.setCategory("Uncategorized");
        }
        if (course.getInstructorId() != null) {
            instructorRepository.findById(course.getInstructorId()).ifPresent(inst -> response.setInstructorName(inst.getName()));
        }
    }

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

    private String getDynamicDefaultThumbnail(String categoryName) {
        String cat = (categoryName == null ? "" : categoryName).toLowerCase();
        if (cat.contains("web") || cat.contains("program") || cat.contains("develop") || cat.contains("cod") || cat.contains("software")) {
            return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80";
        }
        if (cat.contains("data") || cat.contains("ai") || cat.contains("machine") || cat.contains("analytic") || cat.contains("science")) {
            return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80";
        }
        if (cat.contains("cloud") || cat.contains("devops") || cat.contains("network") || cat.contains("security") || cat.contains("cyber")) {
            return "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80";
        }
        if (cat.contains("design") || cat.contains("ui") || cat.contains("ux") || cat.contains("graphic") || cat.contains("art")) {
            return "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80";
        }
        if (cat.contains("business") || cat.contains("finance") || cat.contains("market") || cat.contains("manage") || cat.contains("seo")) {
            return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80";
        }
        if (cat.contains("photo") || cat.contains("video") || cat.contains("media") || cat.contains("music")) {
            return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80";
        }
        return "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80";
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public CourseResponse createCourse(
            Integer userId,
            CreateCourseRequest request) {

        InstituteProfile profile = getOrAutoCreateProfile(userId);

        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new RuntimeException("Validation failure: Title is empty");
        }
        if (request.getPrice() == null || request.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Validation failure: Price is invalid");
        }
        if (request.getDuration() == null || request.getDuration().trim().isEmpty()) {
            throw new RuntimeException("Validation failure: Duration missing");
        }
        if (request.getThumbnail() == null || request.getThumbnail().trim().isEmpty()) {
            String catName = request.getCategoryName() != null ? request.getCategoryName() : (request.getCategory() != null ? request.getCategory() : "");
            request.setThumbnail(getDynamicDefaultThumbnail(catName));
        }
        if (request.getCategoryId() == null && (request.getCategory() == null || request.getCategory().trim().isEmpty()) && (request.getCategoryName() == null || request.getCategoryName().trim().isEmpty())) {
            throw new RuntimeException("Validation failure: Category not selected");
        }
        Instructor instructor = null;
        if (request.getInstructorId() != null && request.getInstructorId() > 0) {
            instructor = instructorRepository.findById(request.getInstructorId()).orElse(null);
        }
        if (instructor == null || !instructor.getInstituteProfileId().equals(profile.getInstituteProfileId())) {
            List<Instructor> insts = instructorRepository.findByInstituteProfileId(profile.getInstituteProfileId());
            if (!insts.isEmpty()) {
                instructor = insts.get(0);
            } else {
                Instructor defaultInst = new Instructor();
                defaultInst.setInstituteProfileId(profile.getInstituteProfileId());
                defaultInst.setName("Default Instructor");
                defaultInst.setSpecialization("General Curriculum");
                defaultInst.setExperience(5);
                defaultInst.setBio("Default faculty profile for newly created courses.");
                defaultInst.setPhoto("https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
                instructor = instructorRepository.save(defaultInst);
            }
        }
        request.setInstructorId(instructor.getInstructorId());

        boolean isDuplicate = courseRepository.findByInstituteProfileId(profile.getInstituteProfileId())
                .stream()
                .anyMatch(c -> c.getTitle() != null && c.getTitle().trim().equalsIgnoreCase(request.getTitle().trim()));
        if (isDuplicate) {
            throw new RuntimeException("Duplicate course");
        }

        Category category = null;
        if (request.getCategoryId() != null && request.getCategoryId() > 0) {
            category = categoryRepository.findById(request.getCategoryId()).orElse(null);
        }
        if (category == null && request.getCategory() != null && !request.getCategory().trim().isEmpty()) {
            category = categoryRepository.findByCategoryName(request.getCategory().trim()).orElse(null);
        }
        if (category == null && request.getCategoryName() != null && !request.getCategoryName().trim().isEmpty()) {
            category = categoryRepository.findByCategoryName(request.getCategoryName().trim()).orElse(null);
        }
        if (category == null) {
            throw new RuntimeException("Validation failure: Category not selected or invalid");
        }

        try {
            Course course = new Course();
            course.setInstituteProfileId(profile.getInstituteProfileId());
            course.setInstructorId(request.getInstructorId());
            course.setTitle(request.getTitle().trim());
            course.setDescription(request.getDescription() != null ? request.getDescription().trim() : "");
            course.setPrice(request.getPrice());
            course.setDuration(request.getDuration().trim());
            course.setThumbnail(request.getThumbnail().trim());

            // When a new course is created: approval_status = "pending", status = "inactive" (to respect MySQL enum: active, inactive, draft)
            course.setApprovalStatus("pending");
            course.setStatus("inactive");

            Course savedCourse = courseRepository.save(course);

            CourseCategoryId ccId = new CourseCategoryId(savedCourse.getCourseId(), category.getCategoryId());
            CourseCategory courseCategory = new CourseCategory(ccId);
            courseCategoryRepository.save(courseCategory);

            CourseResponse response = new CourseResponse();
            BeanUtils.copyProperties(savedCourse, response);
            response.setCategoryId(category.getCategoryId());
            response.setCategory(category.getCategoryName());
            response.setInstructorName(instructor.getName());

            return response;
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Database insert failure", e);
        }
    }

    @Override
    public List<CourseResponse> getAllCourses(Integer userId) {
        Optional<InstituteProfile> profileOpt = (userId != null) ? instituteProfileRepository.findByUserId(userId) : Optional.empty();

        List<Course> courses;
        if (profileOpt.isPresent()) {
            courses = courseRepository.findByInstituteProfileId(profileOpt.get().getInstituteProfileId());
        } else {
            // Student or public user browsing catalog: only approved courses should be visible
            courses = courseRepository.findAll().stream()
                    .filter(c -> c.getApprovalStatus() == null || c.getApprovalStatus().equalsIgnoreCase("approved") || c.getApprovalStatus().equalsIgnoreCase("ACTIVE"))
                    .collect(Collectors.toList());
        }

        return courses.stream().map(course -> {
            CourseResponse response = new CourseResponse();
            BeanUtils.copyProperties(course, response);
            populateCategoryAndInstructor(course, response);
            return response;
        }).collect(Collectors.toList());
    }
    
    @Override
    public CourseResponse getCourseById(Integer userId, Integer courseId) {
        InstituteProfile profile = getOrAutoCreateProfile(userId);

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() ->
                        new RuntimeException("Course not found"));

        if (!course.getInstituteProfileId().equals(profile.getInstituteProfileId())) {
            throw new RuntimeException("You are not authorized to access this course.");
        }

        CourseResponse response = new CourseResponse();
        BeanUtils.copyProperties(course, response);
        populateCategoryAndInstructor(course, response);
        return response;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public CourseResponse updateCourse(
            Integer userId,
            Integer courseId,
            UpdateCourseRequest request) {

        InstituteProfile profile = getOrAutoCreateProfile(userId);

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() ->
                        new RuntimeException("Course not found"));

        if (!course.getInstituteProfileId().equals(profile.getInstituteProfileId())) {
            throw new RuntimeException("You are not authorized to update this course.");
        }

        Instructor instructor = null;
        if (request.getInstructorId() != null && request.getInstructorId() > 0) {
            instructor = instructorRepository.findById(request.getInstructorId()).orElse(null);
        }
        if (instructor == null || !instructor.getInstituteProfileId().equals(profile.getInstituteProfileId())) {
            List<Instructor> insts = instructorRepository.findByInstituteProfileId(profile.getInstituteProfileId());
            if (!insts.isEmpty()) {
                instructor = insts.get(0);
            } else {
                Instructor defaultInst = new Instructor();
                defaultInst.setInstituteProfileId(profile.getInstituteProfileId());
                defaultInst.setName("Default Instructor");
                defaultInst.setSpecialization("General Curriculum");
                defaultInst.setExperience(5);
                defaultInst.setBio("Default faculty profile for newly created courses.");
                defaultInst.setPhoto("https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
                instructor = instructorRepository.save(defaultInst);
            }
        }
        course.setInstructorId(instructor.getInstructorId());
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setPrice(request.getPrice());
        course.setDuration(request.getDuration());
        course.setThumbnail(request.getThumbnail());
        if (request.getStatus() != null) {
            String st = request.getStatus().toLowerCase();
            if (st.equals("active") || st.equals("inactive") || st.equals("draft")) {
                course.setStatus(st);
            } else {
                course.setStatus("inactive");
            }
        }
        if (request.getApprovalStatus() != null) {
            course.setApprovalStatus(request.getApprovalStatus().toLowerCase());
        }

        Course updatedCourse = courseRepository.save(course);

        if (request.getCategoryId() != null) {
            List<CourseCategory> existingCc = courseCategoryRepository.findByIdCourseId(updatedCourse.getCourseId());
            courseCategoryRepository.deleteAll(existingCc);
            CourseCategoryId ccId = new CourseCategoryId(updatedCourse.getCourseId(), request.getCategoryId());
            courseCategoryRepository.save(new CourseCategory(ccId));
        }

        CourseResponse response = new CourseResponse();
        BeanUtils.copyProperties(updatedCourse, response);
        populateCategoryAndInstructor(updatedCourse, response);
        return response;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteCourse(
            Integer userId,
            Integer courseId) {

        InstituteProfile profile = getOrAutoCreateProfile(userId);

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() ->
                        new RuntimeException("Course not found"));

        if (!course.getInstituteProfileId().equals(profile.getInstituteProfileId())) {
            throw new RuntimeException("You are not authorized to delete this course.");
        }

        List<CourseCategory> existingCc = courseCategoryRepository.findByIdCourseId(courseId);
        courseCategoryRepository.deleteAll(existingCc);
        courseRepository.delete(course);
    }
}