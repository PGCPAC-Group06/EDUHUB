package com.eduhub.dto;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateStudentProfileRequest {

    private String name;

    @JsonAlias({"date_of_birth", "dateOfBirth"})
    private LocalDate dateOfBirth;

    private String gender;

    private String mobile;

    @JsonAlias({"college_name", "collegeName"})
    private String collegeName;

    private String degree;

    private String city;

    @JsonAlias({"profile_picture", "profilePicture"})
    private String profilePicture;
}
