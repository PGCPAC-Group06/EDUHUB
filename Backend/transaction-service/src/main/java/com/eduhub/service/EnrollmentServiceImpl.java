package com.eduhub.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eduhub.dto.EnrollCourseRequest;
import com.eduhub.dto.EnrollmentResponse;
import com.eduhub.entity.Enrollment;
import com.eduhub.entity.EnrollmentStatus;
import com.eduhub.repository.EnrollmentRepository;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private com.eduhub.repository.PaymentRepository paymentRepository;

    @Autowired
    private org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;

    @jakarta.annotation.PostConstruct
    public void initSchema() {
        try {
            jdbcTemplate.execute("ALTER TABLE enrollment MODIFY COLUMN payment_id INT NULL DEFAULT NULL");
        } catch (Exception ignored) {
            // Table or column might already be updated or not present
        }
    }

    private void enrichEnrollment(EnrollmentResponse response) {
        if (response == null || response.getCourseId() == null) return;
        try {
            String sql = "SELECT c.title, c.thumbnail, c.price, u.name as inst_name, cat.category_name FROM course c " +
                         "LEFT JOIN institute_profile ip ON c.institute_profile_id = ip.institute_profile_id " +
                         "LEFT JOIN user u ON ip.user_id = u.user_id " +
                         "LEFT JOIN category cat ON c.category_id = cat.category_id " +
                         "WHERE c.course_id = ?";
            jdbcTemplate.query(sql, rs -> {
                response.setCourseTitle(rs.getString("title"));
                response.setThumbnail(rs.getString("thumbnail"));
                response.setPrice(rs.getBigDecimal("price"));
                response.setInstituteName(rs.getString("inst_name"));
                response.setCategory(rs.getString("category_name"));
            }, response.getCourseId());
        } catch (Exception e) {
            response.setCourseTitle("Course #" + response.getCourseId());
            response.setInstituteName("EduHub Institute");
        }
    }

    @Override
    public EnrollmentResponse enrollCourse(
            Integer userId,
            EnrollCourseRequest request) {

        if (enrollmentRepository.findByStudentUserIdAndCourseId(
                userId,
                request.getCourseId()).isPresent()) {

            throw new RuntimeException(
                    "You are already enrolled in this course.");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudentUserId(userId);
        enrollment.setCourseId(request.getCourseId());
        enrollment.setStatus(EnrollmentStatus.active);

        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);

        try {
            com.eduhub.entity.Payment payment = new com.eduhub.entity.Payment();
            payment.setStudentUserId(userId);
            payment.setCourseId(request.getCourseId());
            payment.setEnrollmentId(savedEnrollment.getEnrollmentId());
            payment.setTotalAmount(request.getAmount() != null ? request.getAmount() : new java.math.BigDecimal("4999.00"));
            payment.setPaymentStatus(com.eduhub.entity.PaymentStatus.success);
            payment.setPaymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod() : "Credit Card / Debit Card");
            payment.setTransactionId(request.getTransactionId() != null ? request.getTransactionId() : "TXN_" + System.currentTimeMillis());
            paymentRepository.save(payment);
        } catch (Exception e) {
            System.err.println("Payment recording fallback: " + e.getMessage());
        }

        EnrollmentResponse response = new EnrollmentResponse();
        BeanUtils.copyProperties(savedEnrollment, response);
        enrichEnrollment(response);

        return response;
    }

    @Override
    public List<EnrollmentResponse> getMyEnrollments(
            Integer userId) {

        List<Enrollment> enrollments =
                enrollmentRepository.findByStudentUserId(userId);

        return enrollments.stream().map(enrollment -> {
            EnrollmentResponse response = new EnrollmentResponse();
            BeanUtils.copyProperties(enrollment, response);
            enrichEnrollment(response);
            return response;
        }).collect(Collectors.toList());
    }

    @Override
    public EnrollmentResponse getEnrollmentById(
            Integer userId,
            Integer enrollmentId) {

        Enrollment enrollment = enrollmentRepository
                .findById(enrollmentId)
                .orElseThrow(() ->
                        new RuntimeException("Enrollment not found."));

        if (!enrollment.getStudentUserId().equals(userId)) {
            throw new RuntimeException("You are not authorized.");
        }

        EnrollmentResponse response = new EnrollmentResponse();
        BeanUtils.copyProperties(enrollment, response);
        enrichEnrollment(response);
        return response;
    }

    @Override
    public void cancelEnrollment(
            Integer userId,
            Integer enrollmentId) {

        Enrollment enrollment = enrollmentRepository
                .findById(enrollmentId)
                .orElseThrow(() ->
                        new RuntimeException("Enrollment not found."));

        if (!enrollment.getStudentUserId().equals(userId)) {
            throw new RuntimeException("You are not authorized.");
        }

        enrollment.setStatus(EnrollmentStatus.cancelled);
        enrollmentRepository.save(enrollment);
    }
}