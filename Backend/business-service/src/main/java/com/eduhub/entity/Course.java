package com.eduhub.entity;


import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "course")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Integer courseId;

    @Column(name = "institute_profile_id", nullable = false)
    private Integer instituteProfileId;

    @Column(name = "instructor_id", nullable = false)
    private Integer instructorId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "duration", nullable = false)
    private String duration;

    @Column(name = "thumbnail", columnDefinition = "LONGTEXT")
    private String thumbnail;

    @Column(name = "approval_status")
    private String approvalStatus;

    @Column(name = "status", nullable = false)
    private String status;
}