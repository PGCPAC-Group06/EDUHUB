package com.eduhub.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseResponseDTO {
    private Integer courseId;
    private Integer instituteProfileId;
    private String instituteName; // derived from InstituteProfile or User
    private Integer instructorId;
    private String instructorName;
    private String title;
    private String description;
    private BigDecimal price;
    private String duration;
    private String thumbnail;
    private String approvalStatus;
    private String status;
    private List<CategoryDTO> categories;
}
