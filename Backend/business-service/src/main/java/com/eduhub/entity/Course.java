package com.eduhub.entity;

<<<<<<< HEAD

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
=======
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Entity
@Table(name = "COURSE")
@Getter
@Setter
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Integer courseId;

<<<<<<< HEAD
    @Column(name = "institute_profile_id", nullable = false)
    private Integer instituteProfileId;

    @Column(name = "instructor_id", nullable = false)
    private Integer instructorId;

    @Column(name = "title", nullable = false)
=======
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institute_profile_id", nullable = false)
    private InstituteProfile instituteProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id", nullable = false)
    private Instructor instructor;

    @Column(name = "title", nullable = false, length = 100)
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
    private String title;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

<<<<<<< HEAD
    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "duration", nullable = false)
=======
    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "duration", nullable = false, length = 50)
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
    private String duration;

    @Column(name = "thumbnail")
    private String thumbnail;

<<<<<<< HEAD
    @Column(name = "approval_status")
    private String approvalStatus;

    @Column(name = "status", nullable = false)
    private String status;
}
=======
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
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
