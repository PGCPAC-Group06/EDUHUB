package com.institute_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InstituteProfileRequest {

    private String contactNumber;
    private String website;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String description;
    private String logoUrl;
}
