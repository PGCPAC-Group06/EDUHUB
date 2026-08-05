package com.eduhub.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InstructorResponse {

    private Integer instructorId;

    private Integer instituteProfileId;

    private String name;

    private String specialization;

    private Integer experience;

    private String bio;

    private String photo;
}
