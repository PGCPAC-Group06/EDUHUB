package com.eduhub.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Entity
@Table(name = "COURSE")
@Getter
@Setter
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Integer courseId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institute_profile_id", nullable = false)
    private InstituteProfile instituteProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id", nullable = false)
    private Instructor instructor;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "duration", nullable = false, length = 50)
    private String duration;

    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "approval_status", nullable = false)
    private String approvalStatus; // pending, approved, rejected

    @Column(name = "status", nullable = false)
    private String status; // active, inactive, draft

    @ManyToMany
    @JoinTable(
        name = "COURSE_CATEGORY",
        joinColumns = @JoinColumn(name = "course_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private java.util.Set<Category> categories;
}
