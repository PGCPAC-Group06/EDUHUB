package com.institute_service.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "institute_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InstituteProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "institute_profile_id")
    private Integer instituteProfileId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "gstin", nullable = false, unique = true)
    private String gstin;

    @Column(name = "contact_number", nullable = false)
    private String contactNumber;

    @Column(name = "website")
    private String website;

    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "pincode")
    private String pincode;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}