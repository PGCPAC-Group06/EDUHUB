package com.eduhub.dto;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfileResponse {

    @JsonProperty("student_profile_id")
    private Integer studentProfileId;

    @JsonProperty("user_id")
    private Integer userId;

    private String name;
    private String email;

    @JsonProperty("date_of_birth")
    private LocalDate dateOfBirth;

    private String gender;
    private String mobile;

    @JsonProperty("college_name")
    private String collegeName;

    private String degree;
    private String city;

    @JsonProperty("profile_picture")
    private String profilePicture;
}
