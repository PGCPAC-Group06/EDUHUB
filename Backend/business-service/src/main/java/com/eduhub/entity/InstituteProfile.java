package com.eduhub.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "INSTITUTE_PROFILE")
@Getter
@Setter
public class InstituteProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "institute_profile_id")
    private Integer instituteProfileId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "address", nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(name = "gstin", nullable = false, unique = true, length = 20)
    private String gstin;

    @Column(name = "contact_no", nullable = false, length = 15)
    private String contactNo;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}
