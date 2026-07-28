package com.institute_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "INSTRUCTOR")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "instructor_id")
    private Integer instructorId;

    @ManyToOne
    @JoinColumn(name = "institute_profile_id", nullable = false)
    private InstituteProfile instituteProfile;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "specialization", nullable = false)
    private String specialization;

    @Column(name = "experience")
    private Integer experience;

    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    @Column(name = "photo")
    private String photo;
}
