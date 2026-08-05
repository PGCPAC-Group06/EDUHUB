package com.eduhub.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InstituteProfileResponse {

    private Integer instituteProfileId;

    private Integer userId;

    private String address;

    private String gstin;

    private String contactNo;

    private String description;

    private String city;

    private String state;

    private String pincode;

    private String website;

    private String logoUrl;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}