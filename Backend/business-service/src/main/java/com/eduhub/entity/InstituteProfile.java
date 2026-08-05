package com.eduhub.entity;

<<<<<<< HEAD
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "institute_profile")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InstituteProfile {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "institute_profile_id")
	    private Integer instituteProfileId;

	    @Column(name = "user_id", nullable = false)
	    private Integer userId;

	    @Column(name = "address")
	    private String address;

	    @Column(name = "gstin", nullable = false, unique = true)
	    private String gstin;

	    @Column(name = "contact_no", nullable = false, length = 15)
	    private String contactNo;

	    @Column(name = "description", columnDefinition = "TEXT")
	    private String description;

	    @Column(name = "city")
	    private String city;

	    @Column(name = "state")
	    private String state;

	    @Column(name = "pincode")
	    private String pincode;

	    @Column(name = "website")
	    private String website;

	    @Column(name = "logo_url")
	    private String logoUrl;

	    @Column(name = "created_at", updatable = false)
	    private LocalDateTime createdAt;

	    @Column(name = "updated_at")
	    private LocalDateTime updatedAt;

	    @PrePersist
	    public void prePersist() {
	        createdAt = LocalDateTime.now();
	        updatedAt = LocalDateTime.now();
	    }

	    @PreUpdate
	    public void preUpdate() {
	        updatedAt = LocalDateTime.now();
}
=======
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
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
}
