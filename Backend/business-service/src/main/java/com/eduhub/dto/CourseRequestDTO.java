package com.eduhub.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseRequestDTO {
    private Integer instituteProfileId;
    private Integer instructorId;
    private String title;
    private String description;
    private BigDecimal price;
    private String duration;
    private String thumbnail;
    private String status;
    private List<Integer> categoryIds;
}
