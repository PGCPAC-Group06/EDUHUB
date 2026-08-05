package com.eduhub.dto;

import java.time.LocalDateTime;

public class PendingInstituteResponse {

    private Integer id;
    private Integer userId;
    private String name;
    private String email;
    private String contact;
    private String address;
    private String gstin;
    private String approvalStatus;
    private LocalDateTime createdAt;

    public PendingInstituteResponse() {
        super();
    }

    public PendingInstituteResponse(Integer id, String name, String email, String contact, String address, String gstin,
            String approvalStatus, LocalDateTime createdAt) {
        super();
        this.id = id;
        this.userId = id;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.address = address;
        this.gstin = gstin;
        this.approvalStatus = approvalStatus;
        this.createdAt = createdAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
        this.userId = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
        this.id = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
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

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}