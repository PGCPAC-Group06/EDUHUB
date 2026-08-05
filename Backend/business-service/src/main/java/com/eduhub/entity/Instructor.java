package com.eduhub.entity;

<<<<<<< HEAD

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "instructor")
@Data
@NoArgsConstructor
@AllArgsConstructor
=======
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "INSTRUCTOR")
@Getter
@Setter
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "instructor_id")
    private Integer instructorId;

<<<<<<< HEAD
    @Column(name = "institute_profile_id", nullable = false)
    private Integer instituteProfileId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "specialization", nullable = false)
=======
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institute_profile_id", nullable = false)
    private InstituteProfile instituteProfile;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "specialization", nullable = false, length = 100)
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
    private String specialization;

    @Column(name = "experience")
    private Integer experience;

<<<<<<< HEAD
    @Column(name = "bio")
=======
    @Column(name = "bio", columnDefinition = "TEXT")
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
    private String bio;

    @Column(name = "photo")
    private String photo;
<<<<<<< HEAD
}
=======
}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
