package com.eduhub.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "STUDENT_PROFILE")
@Getter
@Setter
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_profile_id")
    private Integer studentProfileId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "gender", length = 20)
    private String gender;

    @Column(name = "mobile", length = 15)
    private String mobile;

    @Column(name = "college_name", length = 100)
    private String collegeName;

    @Column(name = "degree", length = 100)
    private String degree;

    @Column(name = "city", length = 50)
    private String city;

    @Column(name = "profile_picture")
    private String profilePicture;
}
