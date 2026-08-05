package com.eduhub.controller;

<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
=======
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;
import com.eduhub.dto.RevenueResponse;
import com.eduhub.dto.RevenueStatsResponse;
import com.eduhub.dto.CommissionUpdateRequest;
import com.eduhub.dto.TopInstituteDTO;
import com.eduhub.dto.TopInstitutesResponse;
import com.eduhub.dto.CategoryDistributionDTO;
import com.eduhub.dto.GrowthDataPointDTO;
import com.eduhub.dto.CategoryPerformanceDTO;
import com.eduhub.dto.TopRatedInstituteDTO;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import org.springframework.context.event.EventListener;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.web.bind.annotation.RequestBody;


import com.eduhub.entity.ApprovalStatus;
import com.eduhub.entity.Status;
import com.eduhub.entity.User;
import com.eduhub.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.eduhub.dto.PendingInstituteResponse;
import com.eduhub.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping({"/institutes/pending", "/pending-institutes"})
    public List<PendingInstituteResponse> getPendingInstitutes() {
        return adminService.getPendingInstitutes();
    }
    
<<<<<<< HEAD
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public String test(){
        return "Admin Access Granted";
    }

    @GetMapping("/institutes/pending")
    public ResponseEntity<?> getPendingInstitutes() {
        // Find users with role containing INSTITUTE and PENDING status
        List<User> pending = userRepository.findAll().stream()
                .filter(u -> u.getRole() != null && u.getRole().getRoleName().toUpperCase().contains("INSTITUTE") 
                        && ApprovalStatus.PENDING.equals(u.getApprovalStatus()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(pending);
    }

    @GetMapping("/institutes")
    public ResponseEntity<?> getAllInstitutes() {
        Map<Integer, Integer> courseCounts = new HashMap<>();
        try {
            jdbcTemplate.query("SELECT ip.user_id, COUNT(c.course_id) AS cnt " +
                               "FROM institute_profile ip " +
                               "JOIN course c ON ip.institute_profile_id = c.institute_profile_id " +
                               "GROUP BY ip.user_id", (rs) -> {
                courseCounts.put(rs.getInt("user_id"), rs.getInt("cnt"));
            });
        } catch (Exception e) {
            System.out.println("Error calculating course counts for institutes: " + e.getMessage());
        }

        List<Map<String, Object>> institutes = userRepository.findAll().stream()
                .filter(u -> u.getRole() != null && u.getRole().getRoleName().toUpperCase().contains("INSTITUTE"))
                .map(u -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("userId", u.getUserId());
                    map.put("id", u.getUserId());
                    map.put("name", u.getName());
                    map.put("email", u.getEmail());
                    map.put("approvalStatus", u.getApprovalStatus() != null ? u.getApprovalStatus().name().toLowerCase() : "pending");
                    map.put("createdAt", u.getCreatedAt());
                    map.put("courses", courseCounts.getOrDefault(u.getUserId(), 0));
                    return map;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(institutes);
    }

    @GetMapping("/revenue")
    public ResponseEntity<?> getRevenueByInstitute() {
        String sql = "SELECT u.name AS name, SUM(rs.platform_share) AS revenue, MAX(rs.commission_percentage) AS commission " +
                     "FROM revenue_share rs " +
                     "JOIN payment p ON rs.payment_id = p.payment_id " +
                     "JOIN course c ON p.course_id = c.course_id " +
                     "JOIN institute_profile ip ON c.institute_profile_id = ip.institute_profile_id " +
                     "JOIN users u ON ip.user_id = u.user_id " +
                     "GROUP BY u.name";
                     
        List<RevenueResponse> revenueData = jdbcTemplate.query(sql, (rs, rowNum) -> {
            return new RevenueResponse(
                rs.getString("name"),
                rs.getDouble("revenue"),
                rs.getDouble("commission")
            );
        });
        
        return ResponseEntity.ok(revenueData);
    }

    @GetMapping("/revenue-stats")
    public ResponseEntity<?> getRevenueStats() {
        Double thisMonth = jdbcTemplate.queryForObject(
            "SELECT SUM(rs.platform_share) FROM revenue_share rs JOIN payment p ON rs.payment_id = p.payment_id " +
            "WHERE MONTH(p.payment_date) = MONTH(CURRENT_DATE()) AND YEAR(p.payment_date) = YEAR(CURRENT_DATE())", Double.class);
        
        Double lastMonth = jdbcTemplate.queryForObject(
            "SELECT SUM(rs.platform_share) FROM revenue_share rs JOIN payment p ON rs.payment_id = p.payment_id " +
            "WHERE MONTH(p.payment_date) = MONTH(CURRENT_DATE() - INTERVAL 1 MONTH) AND YEAR(p.payment_date) = YEAR(CURRENT_DATE() - INTERVAL 1 MONTH)", Double.class);
            
        Double lifetime = jdbcTemplate.queryForObject("SELECT SUM(platform_share) FROM revenue_share", Double.class);
        
        thisMonth = thisMonth == null ? 0.0 : thisMonth;
        lastMonth = lastMonth == null ? 0.0 : lastMonth;
        lifetime = lifetime == null ? 0.0 : lifetime;
        
        Double percentageChange = 0.0;
        if (lastMonth > 0) {
            percentageChange = ((thisMonth - lastMonth) / lastMonth) * 100.0;
        } else if (thisMonth > 0) {
            percentageChange = 100.0;
        }
        
        return ResponseEntity.ok(new RevenueStatsResponse(thisMonth, percentageChange, lifetime));
    }

    @PutMapping("/revenue/commission")
    public ResponseEntity<?> updateCommission(@RequestBody CommissionUpdateRequest request) {
        String updateSql = "UPDATE revenue_share rs " +
                           "JOIN payment p ON rs.payment_id = p.payment_id " +
                           "JOIN course c ON p.course_id = c.course_id " +
                           "JOIN institute_profile ip ON c.institute_profile_id = ip.institute_profile_id " +
                           "JOIN users u ON ip.user_id = u.user_id " +
                           "SET rs.commission_percentage = ?, " +
                           "    rs.payment = p.total_amount, " +
                           "    rs.platform_share = p.total_amount * (? / 100.0), " +
                           "    rs.institute_share = p.total_amount - (p.total_amount * (? / 100.0)) " +
                           "WHERE u.name = ?";
                           
        int rowsUpdated = jdbcTemplate.update(updateSql, 
            request.getNewPercentage(), 
            request.getNewPercentage(), 
            request.getNewPercentage(), 
            request.getInstituteName());
            
        return ResponseEntity.ok("Commission updated successfully for " + rowsUpdated + " records");
    }

    @GetMapping("/analytics/top-institutes")
    public ResponseEntity<?> getTopInstitutes() {
        String thisMonthSql = "SELECT u.name, SUM(rs.platform_share) AS revenue " +
                              "FROM revenue_share rs " +
                              "JOIN payment p ON rs.payment_id = p.payment_id " +
                              "JOIN course c ON p.course_id = c.course_id " +
                              "JOIN institute_profile ip ON c.institute_profile_id = ip.institute_profile_id " +
                              "JOIN users u ON ip.user_id = u.user_id " +
                              "WHERE MONTH(p.payment_date) = MONTH(CURRENT_DATE()) " +
                              "  AND YEAR(p.payment_date) = YEAR(CURRENT_DATE()) " +
                              "GROUP BY u.name " +
                              "ORDER BY revenue DESC " +
                              "LIMIT 3";
                              
        String lifetimeSql = "SELECT u.name, SUM(rs.platform_share) AS revenue " +
                             "FROM revenue_share rs " +
                             "JOIN payment p ON rs.payment_id = p.payment_id " +
                             "JOIN course c ON p.course_id = c.course_id " +
                             "JOIN institute_profile ip ON c.institute_profile_id = ip.institute_profile_id " +
                             "JOIN users u ON ip.user_id = u.user_id " +
                             "GROUP BY u.name " +
                             "ORDER BY revenue DESC " +
                             "LIMIT 3";

        List<TopInstituteDTO> thisMonth = jdbcTemplate.query(thisMonthSql, (rs, rowNum) -> 
            new TopInstituteDTO(rs.getString("name"), rs.getDouble("revenue"))
        );

        List<TopInstituteDTO> lifetime = jdbcTemplate.query(lifetimeSql, (rs, rowNum) -> 
            new TopInstituteDTO(rs.getString("name"), rs.getDouble("revenue"))
        );

        return ResponseEntity.ok(new TopInstitutesResponse(thisMonth, lifetime));
    }

    @GetMapping("/analytics/category-distribution")
    public ResponseEntity<?> getCategoryDistribution() {
        String sql = "SELECT c.category_name as name, " +
                     "ROUND(COUNT(e.enrollment_id) * 100.0 / NULLIF((SELECT COUNT(*) FROM enrollment), 0), 1) as percentage " +
                     "FROM category c " +
                     "JOIN course_category cc ON c.category_id = cc.category_id " +
                     "JOIN enrollment e ON cc.course_id = e.course_id " +
                     "GROUP BY c.category_id, c.category_name " +
                     "ORDER BY percentage DESC " +
                     "LIMIT 5";

        List<CategoryDistributionDTO> distribution = jdbcTemplate.query(sql, (rs, rowNum) -> {
            Double pct = rs.getDouble("percentage");
            if (rs.wasNull()) {
                pct = 0.0;
            }
            return new CategoryDistributionDTO(rs.getString("name"), pct);
        });

        return ResponseEntity.ok(distribution);
    }

    @GetMapping("/analytics/platform-growth")
    public ResponseEntity<?> getPlatformGrowth(
            @org.springframework.web.bind.annotation.RequestParam(required = false) String startDate,
            @org.springframework.web.bind.annotation.RequestParam(required = false) String endDate) {
        
        String sql = "SELECT DATE(p.payment_date) as stat_date, SUM(rs.platform_share) as revenue " +
                     "FROM revenue_share rs " +
                     "JOIN payment p ON rs.payment_id = p.payment_id ";
                     
        if (startDate != null && endDate != null && !startDate.isEmpty() && !endDate.isEmpty()) {
            sql += "WHERE DATE(p.payment_date) >= '" + startDate + "' AND DATE(p.payment_date) <= '" + endDate + "' ";
        }
        
        sql += "GROUP BY DATE(p.payment_date) ORDER BY stat_date ASC";

        List<GrowthDataPointDTO> growth = jdbcTemplate.query(sql, (rs, rowNum) -> {
            String dateStr = rs.getString("stat_date");
            Double rev = rs.getDouble("revenue");
            return new GrowthDataPointDTO(dateStr, rev != null ? rev : 0.0);
        });

        return ResponseEntity.ok(growth);
    }

    @GetMapping("/analytics/category-performance")
    public ResponseEntity<?> getCategoryPerformance(
            @org.springframework.web.bind.annotation.RequestParam(required = false) String startDate,
            @org.springframework.web.bind.annotation.RequestParam(required = false) String endDate) {

        String dateFilterEnrollment = "";
        String dateFilterPayment = "";
        
        if (startDate != null && endDate != null && !startDate.isEmpty() && !endDate.isEmpty()) {
            dateFilterEnrollment = "WHERE DATE(e.enrollment_date) >= '" + startDate + "' AND DATE(e.enrollment_date) <= '" + endDate + "' ";
            dateFilterPayment = "WHERE DATE(p.payment_date) >= '" + startDate + "' AND DATE(p.payment_date) <= '" + endDate + "' ";
        }

        // Query 1: Enrollments per category
        String enrollmentsSql = "SELECT c.category_name as name, COUNT(e.enrollment_id) as cnt " +
                                "FROM category c " +
                                "JOIN course_category cc ON c.category_id = cc.category_id " +
                                "JOIN enrollment e ON cc.course_id = e.course_id " +
                                dateFilterEnrollment +
                                "GROUP BY c.category_name";

        // Query 2: Revenue per category
        String revenueSql = "SELECT c.category_name as name, SUM(rs.platform_share) as revenue " +
                            "FROM category c " +
                            "JOIN course_category cc ON c.category_id = cc.category_id " +
                            "JOIN course co ON cc.course_id = co.course_id " +
                            "JOIN payment p ON co.course_id = p.course_id " +
                            "JOIN revenue_share rs ON p.payment_id = rs.payment_id " +
                            dateFilterPayment +
                            "GROUP BY c.category_name";

        Map<String, CategoryPerformanceDTO> performanceMap = new HashMap<>();
        
        // Ensure all categories exist in map
        jdbcTemplate.query("SELECT category_name FROM category", (rs, rowNum) -> {
            performanceMap.put(rs.getString("category_name"), new CategoryPerformanceDTO(rs.getString("category_name"), 0.0, 0.0));
            return null;
        });

        // Add Enrollments
        double totalEnrollments = 0;
        List<Map<String, Object>> enrollRows = jdbcTemplate.queryForList(enrollmentsSql);
        for (Map<String, Object> row : enrollRows) {
            String name = (String) row.get("name");
            Number cnt = (Number) row.get("cnt");
            double cntVal = cnt != null ? cnt.doubleValue() : 0.0;
            totalEnrollments += cntVal;
            
            CategoryPerformanceDTO dto = performanceMap.getOrDefault(name, new CategoryPerformanceDTO(name, 0.0, 0.0));
            dto.setEnrollmentPercentage(cntVal);
            performanceMap.put(name, dto);
        }

        // Convert to percentage
        if (totalEnrollments > 0) {
            for (CategoryPerformanceDTO dto : performanceMap.values()) {
                dto.setEnrollmentPercentage(Math.round((dto.getEnrollmentPercentage() / totalEnrollments * 100.0) * 10.0) / 10.0);
            }
        }

        // Add Revenue
        List<Map<String, Object>> revRows = jdbcTemplate.queryForList(revenueSql);
        for (Map<String, Object> row : revRows) {
            String name = (String) row.get("name");
            Number rev = (Number) row.get("revenue");
            double revVal = rev != null ? rev.doubleValue() : 0.0;
            
            CategoryPerformanceDTO dto = performanceMap.getOrDefault(name, new CategoryPerformanceDTO(name, 0.0, 0.0));
            dto.setRevenue(revVal);
            performanceMap.put(name, dto);
        }

        // Sort by revenue descending, limit top 5
        List<CategoryPerformanceDTO> results = new ArrayList<>(performanceMap.values());
        results.sort((a, b) -> Double.compare(b.getRevenue(), a.getRevenue()));
        if (results.size() > 5) {
            results = results.subList(0, 5);
        }

        return ResponseEntity.ok(results);
    }

    @GetMapping("/overview/top-rated-institute")
    public ResponseEntity<?> getTopRatedInstitute() {
        String sql = "SELECT u.name, ROUND(AVG(r.rating), 1) as rating " +
                     "FROM review r " +
                     "JOIN enrollment e ON r.enrollment_id = e.enrollment_id " +
                     "JOIN course c ON e.course_id = c.course_id " +
                     "JOIN institute_profile ip ON c.institute_profile_id = ip.institute_profile_id " +
                     "JOIN users u ON ip.user_id = u.user_id " +
                     "GROUP BY u.name " +
                     "ORDER BY rating DESC";

        List<TopRatedInstituteDTO> results = jdbcTemplate.query(sql, (rs, rowNum) -> {
            Double rating = rs.getDouble("rating");
            if (rs.wasNull()) rating = 0.0;
            return new TopRatedInstituteDTO(rs.getString("name"), rating);
        });

        if (results.isEmpty()) {
            return ResponseEntity.ok(new TopRatedInstituteDTO("N/A", 0.0));
        }

        TopRatedInstituteDTO top = results.get(0);
        List<TopRatedInstituteDTO> tied = new ArrayList<>();
        for (TopRatedInstituteDTO dto : results) {
            if (dto.getRating() != null && top.getRating() != null &&
                Math.abs(dto.getRating() - top.getRating()) < 0.001) {
                tied.add(new TopRatedInstituteDTO(dto.getName(), dto.getRating()));
            } else {
                break; // Because results is ordered by rating DESC, once rating drops, no more top ties
            }
        }

        if (tied.size() > 1) {
            top.setTiedInstitutes(tied);
        }

        return ResponseEntity.ok(top);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void backfillRevenue() {
        try {
            // First, insert any missing payments (with 15% default)
            String insertSql = "INSERT INTO revenue_share (payment_id, payment, commission_percentage, platform_share, institute_share) " +
                               "SELECT p.payment_id, p.total_amount, 15.0, (p.total_amount * 0.15), (p.total_amount * 0.85) " +
                               "FROM payment p " +
                               "WHERE p.payment_id NOT IN (SELECT payment_id FROM revenue_share)";
            jdbcTemplate.update(insertSql);
            
            // Second, recalculate platform_share and institute_share for ALL records using their actual commission_percentage
            String updateSql = "UPDATE revenue_share SET " +
                               "platform_share = payment * (commission_percentage / 100.0), " +
                               "institute_share = payment - (payment * (commission_percentage / 100.0))";
            int rowsUpdated = jdbcTemplate.update(updateSql);
            System.out.println("Recalculated " + rowsUpdated + " records in revenue_share");
        } catch (Exception e) {
            System.out.println("Error recalculating revenue_share: " + e.getMessage());
        }
    }

    @GetMapping("/students")
    public ResponseEntity<?> getAllStudents() {
        // Find all users with role containing STUDENT
        List<User> students = userRepository.findAll().stream()
                .filter(u -> u.getRole() != null && u.getRole().getRoleName().toUpperCase().contains("STUDENT"))
                .collect(Collectors.toList());
        return ResponseEntity.ok(students);
    }

    @PutMapping("/institutes/{id}/approve")
    public ResponseEntity<?> approveInstitute(@PathVariable("id") Integer id) {
        Optional<User> optUser = userRepository.findById(id);
        if(optUser.isPresent()){
            User u = optUser.get();
            u.setApprovalStatus(ApprovalStatus.APPROVED);
            userRepository.save(u);
            return ResponseEntity.ok("Approved");
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/institutes/{id}/reject")
    public ResponseEntity<?> rejectInstitute(@PathVariable("id") Integer id) {
        Optional<User> optUser = userRepository.findById(id);
        if(optUser.isPresent()){
            User u = optUser.get();
            u.setApprovalStatus(ApprovalStatus.REJECTED);
            userRepository.save(u);
            return ResponseEntity.ok("Rejected");
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/students/{id}/suspend")
    public ResponseEntity<?> suspendStudent(@PathVariable("id") Integer id) {
        Optional<User> optUser = userRepository.findById(id);
        if(optUser.isPresent()){
            User u = optUser.get();
            u.setStatus(Status.BLOCKED);
            userRepository.save(u);
            return ResponseEntity.ok("Suspended");
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/students/{id}/reactivate")
    public ResponseEntity<?> reactivateStudent(@PathVariable("id") Integer id) {
        Optional<User> optUser = userRepository.findById(id);
        if(optUser.isPresent()){
            User u = optUser.get();
            u.setStatus(Status.ACTIVE);
            userRepository.save(u);
            return ResponseEntity.ok("Reactivated");
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/courses")
    public ResponseEntity<?> getAllCoursesForAdmin() {
        String sql = "SELECT c.course_id, c.title, c.price, c.duration, c.thumbnail, " +
                     "COALESCE(c.approval_status, 'approved') AS approval_status, c.status, " +
                     "COALESCE(u.name, 'EduHub Institute') AS institute_name " +
                     "FROM course c " +
                     "LEFT JOIN institute_profile ip ON c.institute_profile_id = ip.institute_profile_id " +
                     "LEFT JOIN users u ON ip.user_id = u.user_id " +
                     "ORDER BY c.course_id DESC";
        try {
            List<Map<String, Object>> courses = jdbcTemplate.query(sql, (rs, rowNum) -> {
                Map<String, Object> map = new HashMap<>();
                map.put("courseId", rs.getInt("course_id"));
                map.put("id", rs.getInt("course_id"));
                map.put("title", rs.getString("title"));
                map.put("price", rs.getBigDecimal("price"));
                map.put("duration", rs.getString("duration"));
                map.put("thumbnail", rs.getString("thumbnail"));
                map.put("instituteName", rs.getString("institute_name"));
                map.put("approvalStatus", rs.getString("approval_status"));
                map.put("status", rs.getString("status"));
                return map;
            });
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching admin courses: " + e.getMessage());
        }
    }

    @PutMapping("/courses/{id}/approve")
    public ResponseEntity<?> approveCourse(@PathVariable("id") Integer id) {
        try {
            int updated = jdbcTemplate.update("UPDATE course SET approval_status = 'approved', status = 'active' WHERE course_id = ?", id);
            if (updated > 0) {
                return ResponseEntity.ok("Course approved");
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/courses/{id}/reject")
    public ResponseEntity<?> rejectCourse(@PathVariable("id") Integer id) {
        try {
            int updated = jdbcTemplate.update("UPDATE course SET approval_status = 'rejected', status = 'inactive' WHERE course_id = ?", id);
            if (updated > 0) {
                return ResponseEntity.ok("Course rejected");
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
=======
    @PutMapping({"/institutes/{id}/approve", "/approve/{id}"})
    public String approveInstitute(@PathVariable Integer id) {
        return adminService.approveInstitute(id);
    }
    
    @PutMapping({"/institutes/{id}/reject", "/reject/{id}"})
    public String rejectInstitutePut(@PathVariable Integer id) {
        return adminService.rejectInstitute(id);
    }

    @DeleteMapping({"/institutes/{id}/reject", "/reject/{id}"})
    public String rejectInstituteDelete(@PathVariable Integer id) {
        return adminService.rejectInstitute(id);
    }
}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
