package com.eduhub.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryPerformanceDTO {
    private String categoryName;
    private Double revenue;
    private Double enrollmentPercentage;
}
