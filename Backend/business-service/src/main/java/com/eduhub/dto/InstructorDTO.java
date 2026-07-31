package com.eduhub.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InstructorDTO {
    private Integer instructorId;
    private Integer instituteProfileId;
    private String name;
    private String specialization;
    private Integer experience;
    private String bio;
    private String photo;
}
