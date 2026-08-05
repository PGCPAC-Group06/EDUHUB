package com.eduhub.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateStudentProfileRequest {
    private LocalDate dateOfBirth;
    private String gender;
    private String mobile;
    private String collegeName;
    private String degree;
    private String city;
    private String profilePicture;
}
