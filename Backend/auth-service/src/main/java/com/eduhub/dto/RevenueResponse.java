package com.eduhub.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RevenueResponse {
    private String name;
    private Double revenue;
    private Double commission;
}
