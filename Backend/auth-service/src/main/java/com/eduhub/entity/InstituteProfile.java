package com.eduhub.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "INSTITUTE_PROFILE")
public class InstituteProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "institute_profile_id")
    private Integer instituteProfileId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "address", nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(name = "gstin", nullable = false, unique = true, length = 20)
    private String gstin;

    @Column(name = "contact_no", nullable = false, length = 15)
    private String contactNo;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    public InstituteProfile() {
        super();
    }

    public InstituteProfile(User user, String address, String gstin, String contactNo, String description) {
        super();
        this.user = user;
        this.address = address;
        this.gstin = gstin;
        this.contactNo = contactNo;
        this.description = description;
    }

    public Integer getInstituteProfileId() {
        return instituteProfileId;
    }

    public void setInstituteProfileId(Integer instituteProfileId) {
        this.instituteProfileId = instituteProfileId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGstin() {
        return gstin;
    }

    public void setGstin(String gstin) {
        this.gstin = gstin;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
