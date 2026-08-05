package com.eduhub.controller;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import com.eduhub.entity.Enrollment;
import com.eduhub.entity.Payment;
import com.eduhub.repository.EnrollmentRepository;
import com.eduhub.repository.PaymentRepository;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/student")
public class DashboardController {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private Integer getUserId(HttpServletRequest request) {
        Object attr = request.getAttribute("userId");
        if (attr instanceof Integer) {
            return (Integer) attr;
        }
        try {
            String name = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getName();
            return Integer.parseInt(name);
        } catch (Exception e) {
            return 101; // fallback default
        }
    }

    private String getCourseTitle(Integer courseId) {
        try {
            return jdbcTemplate.queryForObject("SELECT title FROM course WHERE course_id = ?", String.class, courseId);
        } catch (Exception e) {
            return "Course #" + courseId;
        }
    }

    private String getCourseThumbnail(Integer courseId) {
        try {
            String thumb = jdbcTemplate.queryForObject("SELECT thumbnail FROM course WHERE course_id = ?", String.class, courseId);
            if (thumb != null && !thumb.trim().isEmpty()) return thumb;
        } catch (Exception ignored) {}
        return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500";
    }

    private String getInstituteNameByCourse(Integer courseId) {
        try {
            String sql = "SELECT u.name FROM course c JOIN institute_profile ip ON c.institute_profile_id = ip.institute_profile_id JOIN user u ON ip.user_id = u.user_id WHERE c.course_id = ?";
            String name = jdbcTemplate.queryForObject(sql, String.class, courseId);
            if (name != null) return name;
        } catch (Exception ignored) {}
        return "EduHub Partner Institute";
    }

    @GetMapping("/dashboard-summary")
    public ResponseEntity<?> getDashboardSummary(HttpServletRequest request) {
        Integer userId = getUserId(request);
        List<Enrollment> enrollments = enrollmentRepository.findByStudentUserId(userId);
        List<Payment> payments = paymentRepository.findByStudentUserId(userId);

        List<Map<String, Object>> enrollmentList = new ArrayList<>();
        List<Map<String, Object>> activities = new ArrayList<>();

        for (Enrollment e : enrollments) {
            Map<String, Object> map = new HashMap<>();
            map.put("enrollment_id", e.getEnrollmentId());
            map.put("enrollmentId", e.getEnrollmentId());
            map.put("course_id", e.getCourseId());
            map.put("courseId", e.getCourseId());
            map.put("enrollment_date", e.getEnrollmentDate());
            map.put("status", e.getStatus().toString());
            map.put("progress", 75); // Active learning state

            String title = getCourseTitle(e.getCourseId());
            Map<String, Object> courseMap = new HashMap<>();
            courseMap.put("course_id", e.getCourseId());
            courseMap.put("title", title);
            courseMap.put("thumbnail", getCourseThumbnail(e.getCourseId()));
            courseMap.put("institute_name", getInstituteNameByCourse(e.getCourseId()));
            map.put("course", courseMap);
            map.put("title", title);
            enrollmentList.add(map);

            Map<String, Object> act = new HashMap<>();
            act.put("id", "e_" + e.getEnrollmentId());
            act.put("text", "Enrolled in " + title);
            act.put("time", e.getEnrollmentDate() != null ? e.getEnrollmentDate().toLocalDate().toString() : "Recent");
            act.put("type", "Enrollment");
            activities.add(act);
        }

        for (Payment p : payments) {
            Map<String, Object> act = new HashMap<>();
            act.put("id", "p_" + p.getPaymentId());
            act.put("text", "Completed payment of ₹" + p.getTotalAmount() + " via " + p.getPaymentMethod());
            act.put("time", p.getPaymentDate() != null ? p.getPaymentDate().toLocalDate().toString() : "Recent");
            act.put("type", "Payment");
            activities.add(act);
        }

        Map<String, Object> summary = new HashMap<>();
        summary.put("coursesInProgress", enrollments.size());
        summary.put("certificatesEarned", enrollments.size());
        summary.put("enrollments", enrollmentList);
        summary.put("activities", activities);

        return ResponseEntity.ok(summary);
    }

    @GetMapping("/certificates")
    public ResponseEntity<?> getCertificates(HttpServletRequest request) {
        Integer userId = getUserId(request);
        List<Enrollment> enrollments = enrollmentRepository.findByStudentUserId(userId);
        List<Map<String, Object>> certs = new ArrayList<>();

        for (Enrollment e : enrollments) {
            Map<String, Object> c = new HashMap<>();
            c.put("certificate_id", 8000 + e.getEnrollmentId());
            c.put("title", getCourseTitle(e.getCourseId()) + " Completion Certificate");
            c.put("issue_date", e.getEnrollmentDate() != null ? e.getEnrollmentDate().toLocalDate().toString() : "August 2026");
            c.put("course_id", e.getCourseId());
            c.put("download_url", "#");
            certs.add(c);
        }
        return ResponseEntity.ok(certs);
    }

    @GetMapping("/notifications")
    public ResponseEntity<?> getNotifications(HttpServletRequest request) {
        Integer userId = getUserId(request);
        List<Enrollment> enrollments = enrollmentRepository.findByStudentUserId(userId);
        List<Map<String, Object>> notifs = new ArrayList<>();

        Map<String, Object> welcome = new HashMap<>();
        welcome.put("id", 1);
        welcome.put("text", "Welcome to your EduHub Student Dashboard. Explore approved courses in the Browse Catalog!");
        welcome.put("time", java.time.LocalDate.now().toString());
        welcome.put("read", true);
        notifs.add(welcome);

        for (Enrollment e : enrollments) {
            Map<String, Object> n = new HashMap<>();
            n.put("id", 100 + e.getEnrollmentId());
            n.put("text", "You successfully enrolled in '" + getCourseTitle(e.getCourseId()) + "'. Enjoy learning!");
            n.put("time", e.getEnrollmentDate() != null ? e.getEnrollmentDate().toLocalDate().toString() : "Recently");
            n.put("read", false);
            notifs.add(n);
        }

        return ResponseEntity.ok(notifs);
    }
}
