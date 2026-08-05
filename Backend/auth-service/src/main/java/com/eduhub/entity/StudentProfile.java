package com.eduhub.entity;

import java.time.LocalDate;
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
@Table(name = "STUDENT_PROFILE")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_profile_id")
    private Integer studentProfileId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

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

    @Column(name = "profile_picture", length = 255)
    private String profilePicture;

    public StudentProfile() {
        super();
    }

    public StudentProfile(User user, LocalDate dateOfBirth, String gender, String mobile, String collegeName,
            String degree, String city, String profilePicture) {
        super();
        this.user = user;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.mobile = mobile;
        this.collegeName = collegeName;
        this.degree = degree;
        this.city = city;
        this.profilePicture = profilePicture;
    }

    public Integer getStudentProfileId() {
        return studentProfileId;
    }

    public void setStudentProfileId(Integer studentProfileId) {
        this.studentProfileId = studentProfileId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}
