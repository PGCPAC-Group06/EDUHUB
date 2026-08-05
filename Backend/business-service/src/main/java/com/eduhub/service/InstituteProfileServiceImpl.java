package com.eduhub.service;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Collections;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.JdbcTemplate;

import com.eduhub.dto.CreateInstituteProfileRequest;
import com.eduhub.dto.InstituteProfileResponse;
import com.eduhub.dto.UpdateInstituteProfileRequest;
import com.eduhub.entity.InstituteProfile;
import com.eduhub.repository.InstituteProfileRepository;



@Service
public class InstituteProfileServiceImpl implements InstituteProfileService {

    @Autowired
    private InstituteProfileRepository instituteProfileRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public InstituteProfileResponse createProfile(
            Integer userId,
            CreateInstituteProfileRequest request) {

        // Check if profile already exists
        if (instituteProfileRepository.existsByUserId(userId)) {
            throw new RuntimeException("Institute profile already exists.");
        }

        // Check duplicate GSTIN
        if (instituteProfileRepository.existsByGstin(request.getGstin())) {
            throw new RuntimeException("GSTIN already exists.");
        }

        // Create Entity
        InstituteProfile profile = new InstituteProfile();

        profile.setUserId(userId);
        profile.setAddress(request.getAddress());
        profile.setGstin(request.getGstin());
        profile.setContactNo(request.getContactNo());
        profile.setDescription(request.getDescription());
        profile.setCity(request.getCity());
        profile.setState(request.getState());
        profile.setPincode(request.getPincode());
        profile.setWebsite(request.getWebsite());
        profile.setLogoUrl(request.getLogoUrl());

        // Save
        InstituteProfile savedProfile =
                instituteProfileRepository.save(profile);

        // Response
        InstituteProfileResponse response =
                new InstituteProfileResponse();

        BeanUtils.copyProperties(savedProfile, response);

        return response;
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

    @Override
    public InstituteProfileResponse getProfile(Integer userId) {

        InstituteProfile profile = getOrAutoCreateProfile(userId);

        InstituteProfileResponse response =
                new InstituteProfileResponse();

        BeanUtils.copyProperties(profile, response);

        return response;
    }

    @Override
    public InstituteProfileResponse updateProfile(
            Integer userId,
            UpdateInstituteProfileRequest request) {

        InstituteProfile profile = getOrAutoCreateProfile(userId);

        profile.setAddress(request.getAddress());
        profile.setContactNo(request.getContactNo());
        profile.setDescription(request.getDescription());
        profile.setCity(request.getCity());
        profile.setState(request.getState());
        profile.setPincode(request.getPincode());
        profile.setWebsite(request.getWebsite());
        profile.setLogoUrl(request.getLogoUrl());

        InstituteProfile updatedProfile =
                instituteProfileRepository.save(profile);

        InstituteProfileResponse response =
                new InstituteProfileResponse();

        BeanUtils.copyProperties(updatedProfile, response);

        return response;
    }

    @Override
    public List<InstituteProfileResponse> getAllProfiles() {
        return instituteProfileRepository.findAll().stream().map(profile -> {
            InstituteProfileResponse response = new InstituteProfileResponse();
            BeanUtils.copyProperties(profile, response);
            return response;
        }).collect(Collectors.toList());
    }

    @Override
    public List<Map<String, Object>> getStudents(Integer userId) {
        Integer profileId = getOrAutoCreateProfile(userId).getInstituteProfileId();
        if (profileId == null || profileId == -1) {
            return Collections.emptyList();
        }
        String sql = "SELECT e.enrollment_id, u.name, u.email, c.title as course, c.course_id, " +
                     "DATE_FORMAT(e.enrollment_date, '%d %b %Y') as enrolled_time, 100 as progress, " +
                     "CASE WHEN LOWER(e.status) = 'active' THEN 'Active' WHEN LOWER(e.status) = 'completed' THEN 'Completed' ELSE 'Cancelled' END as status " +
                     "FROM enrollment e JOIN users u ON e.student_user_id = u.user_id JOIN course c ON e.course_id = c.course_id " +
                     "WHERE c.institute_profile_id = ? ORDER BY e.enrollment_date DESC";
        return jdbcTemplate.queryForList(sql, profileId);
    }

    @Override
    public Map<String, Object> getDashboardSummary(Integer userId) {
        Integer profileId = getOrAutoCreateProfile(userId).getInstituteProfileId();
        if (profileId == null || profileId == -1) {
            return Collections.emptyMap();
        }
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> stats = new HashMap<>();

        Integer totalStudents = jdbcTemplate.queryForObject(
                "SELECT COUNT(DISTINCT e.student_user_id) FROM enrollment e JOIN course c ON e.course_id = c.course_id WHERE c.institute_profile_id = ?",
                Integer.class, profileId);
        Integer activeCourses = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM course WHERE institute_profile_id = ? AND LOWER(status) = 'active'",
                Integer.class, profileId);
        Integer totalCourses = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM course WHERE institute_profile_id = ?",
                Integer.class, profileId);
        Integer pendingCourses = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM course WHERE institute_profile_id = ? AND LOWER(approval_status) = 'pending'",
                Integer.class, profileId);
        Integer activeInstructors = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM instructor WHERE institute_profile_id = ?",
                Integer.class, profileId);
        try {
            jdbcTemplate.update("INSERT INTO revenue_share (payment_id, payment, commission_percentage, platform_share, institute_share) " +
                                "SELECT p.payment_id, p.total_amount, 15.0, (p.total_amount * 0.15), (p.total_amount * 0.85) " +
                                "FROM payment p WHERE p.payment_id NOT IN (SELECT payment_id FROM revenue_share)");
        } catch (Exception ignored) {}

        Double lifetimeRevenue = jdbcTemplate.queryForObject(
                "SELECT COALESCE(SUM(rs.institute_share), 0) FROM payment p JOIN revenue_share rs ON p.payment_id = rs.payment_id JOIN course c ON p.course_id = c.course_id WHERE c.institute_profile_id = ? AND LOWER(p.payment_status) = 'success'",
                Double.class, profileId);
        Double revenueMtd = jdbcTemplate.queryForObject(
                "SELECT COALESCE(SUM(rs.institute_share), 0) FROM payment p JOIN revenue_share rs ON p.payment_id = rs.payment_id JOIN course c ON p.course_id = c.course_id WHERE c.institute_profile_id = ? AND LOWER(p.payment_status) = 'success' AND MONTH(p.payment_date) = MONTH(CURRENT_DATE()) AND YEAR(p.payment_date) = YEAR(CURRENT_DATE())",
                Double.class, profileId);
        Double revenueLastMonth = jdbcTemplate.queryForObject(
                "SELECT COALESCE(SUM(rs.institute_share), 0) FROM payment p JOIN revenue_share rs ON p.payment_id = rs.payment_id JOIN course c ON p.course_id = c.course_id WHERE c.institute_profile_id = ? AND LOWER(p.payment_status) = 'success' AND MONTH(p.payment_date) = MONTH(CURRENT_DATE() - INTERVAL 1 MONTH) AND YEAR(p.payment_date) = YEAR(CURRENT_DATE() - INTERVAL 1 MONTH)",
                Double.class, profileId);
        String revenueGrowth;
        if (revenueLastMonth != null && revenueLastMonth > 0) {
            double pct = (((revenueMtd != null ? revenueMtd : 0.0) - revenueLastMonth) / revenueLastMonth) * 100.0;
            revenueGrowth = (pct >= 0 ? "+" : "") + Math.round(pct * 10.0) / 10.0 + "% vs last month";
        } else if (revenueMtd != null && revenueMtd > 0) {
            revenueGrowth = "+100% vs last month";
        } else {
            revenueGrowth = "+0% vs last month";
        }

        Double pendingPayouts = jdbcTemplate.queryForObject(
                "SELECT COALESCE(SUM(rs.platform_share), 0) FROM payment p JOIN revenue_share rs ON p.payment_id = rs.payment_id JOIN course c ON p.course_id = c.course_id WHERE c.institute_profile_id = ? AND LOWER(p.payment_status) = 'success' AND MONTH(p.payment_date) = MONTH(CURRENT_DATE()) AND YEAR(p.payment_date) = YEAR(CURRENT_DATE())",
                Double.class, profileId);
        Double avgRating = jdbcTemplate.queryForObject(
                "SELECT COALESCE(AVG(r.rating), 0) FROM review r JOIN enrollment e ON r.enrollment_id = e.enrollment_id JOIN course c ON e.course_id = c.course_id WHERE c.institute_profile_id = ?",
                Double.class, profileId);

        stats.put("totalStudents", totalStudents != null ? totalStudents : 0);
        stats.put("activeCourses", activeCourses != null ? activeCourses : 0);
        stats.put("totalCourses", totalCourses != null ? totalCourses : 0);
        stats.put("pendingCourses", pendingCourses != null ? pendingCourses : 0);
        stats.put("activeInstructors", activeInstructors != null ? activeInstructors : 0);
        stats.put("lifetimeRevenue", lifetimeRevenue != null ? lifetimeRevenue : 0.0);
        stats.put("revenueMtd", revenueMtd != null ? revenueMtd : 0.0);
        stats.put("pendingPayouts", pendingPayouts != null ? pendingPayouts : 0.0);
        stats.put("payouts", pendingPayouts != null ? pendingPayouts : 0.0);
        stats.put("avgRating", avgRating != null ? avgRating : 0.0);
        stats.put("studentsWeeklyGrowth", "Live metrics");
        stats.put("coursesMonthlyGrowth", "Live metrics");
        stats.put("revenueGrowth", revenueGrowth);
        response.put("stats", stats);

        List<Map<String, Object>> recentTransactions = jdbcTemplate.queryForList(
                "SELECT p.payment_id as transaction_id, u.name as student, c.title as course, rs.institute_share as amount, DATE_FORMAT(p.payment_date, '%d %b %Y') as date, CASE WHEN LOWER(p.payment_status) = 'success' THEN 'Paid' ELSE 'Refunded' END as status FROM payment p JOIN revenue_share rs ON p.payment_id = rs.payment_id JOIN users u ON p.student_user_id = u.user_id JOIN course c ON p.course_id = c.course_id WHERE c.institute_profile_id = ? ORDER BY p.payment_date DESC LIMIT 10",
                profileId);
        response.put("recentTransactions", recentTransactions);

        List<Map<String, Object>> recentReviews = jdbcTemplate.queryForList(
                "SELECT r.review_id as id, r.review_id, u.name as student, u.name as author, c.title as course, r.rating, r.comment, DATE_FORMAT(r.created_at, '%d %b %Y') as time, DATE_FORMAT(r.created_at, '%d %b %Y') as date FROM review r JOIN enrollment e ON r.enrollment_id = e.enrollment_id JOIN users u ON e.student_user_id = u.user_id JOIN course c ON e.course_id = c.course_id WHERE c.institute_profile_id = ? ORDER BY r.created_at DESC LIMIT 10",
                profileId);
        response.put("recentReviews", recentReviews);

        List<Map<String, Object>> topCourses = jdbcTemplate.queryForList(
                "SELECT c.course_id, c.title, COUNT(e.enrollment_id) as students_count, COALESCE(SUM(rs.institute_share), 0) as revenue FROM course c LEFT JOIN enrollment e ON c.course_id = e.course_id LEFT JOIN payment p ON e.payment_id = p.payment_id AND LOWER(p.payment_status) = 'success' LEFT JOIN revenue_share rs ON p.payment_id = rs.payment_id WHERE c.institute_profile_id = ? GROUP BY c.course_id, c.title ORDER BY students_count DESC, revenue DESC LIMIT 5",
                profileId);
        response.put("topCourses", topCourses);

        List<Map<String, Object>> sourcesQuery = jdbcTemplate.queryForList(
                "SELECT COALESCE(cat.category_name, 'General') as source, COUNT(e.enrollment_id) as cnt FROM course c LEFT JOIN course_category cc ON c.course_id = cc.course_id LEFT JOIN category cat ON cc.category_id = cat.category_id LEFT JOIN enrollment e ON c.course_id = e.course_id WHERE c.institute_profile_id = ? GROUP BY cat.category_name",
                profileId);
        long totalEnr = sourcesQuery.stream().mapToLong(m -> ((Number) m.getOrDefault("cnt", 0)).longValue()).sum();
        List<Map<String, Object>> enrollmentSources = new ArrayList<>();
        for (Map<String, Object> m : sourcesQuery) {
            long cnt = ((Number) m.getOrDefault("cnt", 0)).longValue();
            long pct = totalEnr > 0 ? (cnt * 100 / totalEnr) : 0;
            Map<String, Object> src = new HashMap<>();
            src.put("source", m.get("source"));
            src.put("percent", pct);
            enrollmentSources.add(src);
        }
        if (enrollmentSources.isEmpty()) {
            Map<String, Object> defaultSrc = new HashMap<>();
            defaultSrc.put("source", "Direct Enrollment");
            defaultSrc.put("percent", 100);
            enrollmentSources.add(defaultSrc);
        }
        response.put("enrollmentSources", enrollmentSources);

        List<Map<String, Object>> revenueTrend = jdbcTemplate.queryForList(
                "SELECT DATE_FORMAT(p.payment_date, '%b') as month, COALESCE(SUM(rs.institute_share), 0) as revenue FROM payment p JOIN revenue_share rs ON p.payment_id = rs.payment_id JOIN course c ON p.course_id = c.course_id WHERE c.institute_profile_id = ? AND LOWER(p.payment_status) = 'success' AND p.payment_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH) GROUP BY DATE_FORMAT(p.payment_date, '%b'), MONTH(p.payment_date) ORDER BY MONTH(p.payment_date)",
                profileId);
        response.put("revenueTrend", revenueTrend);

        return response;
    }
}