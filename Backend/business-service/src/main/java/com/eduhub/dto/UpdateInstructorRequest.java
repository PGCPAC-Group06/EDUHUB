package com.eduhub.dto;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateInstructorRequest {

    @NotBlank(message = "Instructor name is required")
    private String name;

    @NotBlank(message = "Specialization is required")
    private String specialization;

    @Min(value = 0, message = "Experience cannot be negative")
    private Integer experience;

    private String bio;

    private String photo;
}