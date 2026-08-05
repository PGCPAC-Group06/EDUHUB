package com.eduhub.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RevenueStatsResponse {
    private Double thisMonthRevenue;
    private Double percentageChange;
    private Double lifetimeRevenue;
}
