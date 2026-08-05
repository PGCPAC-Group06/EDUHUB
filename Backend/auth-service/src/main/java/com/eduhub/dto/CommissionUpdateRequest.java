package com.eduhub.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommissionUpdateRequest {
    private String instituteName;
    private Double newPercentage;
}
