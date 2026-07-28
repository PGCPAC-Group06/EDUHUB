package com.institute_service.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InstituteProfileResponse {

    private Integer instituteId;
    private Integer userId;
    private String contactNumber;
    private String website;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String description;
    private String logoUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}