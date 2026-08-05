package com.eduhub.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateInstituteProfileRequest {

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "GSTIN is required")
    @Size(min = 15, max = 15, message = "GSTIN must be 15 characters")
    private String gstin;

    @NotBlank(message = "Contact number is required")
    @Pattern(
        regexp = "^[6-9][0-9]{9}$",
        message = "Invalid contact number"
    )
    private String contactNo;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Pincode is required")
    @Pattern(
        regexp = "^[0-9]{6}$",
        message = "Invalid pincode"
    )
    private String pincode;

    @NotBlank(message = "Website is required")
    private String website;

    private String logoUrl;
}