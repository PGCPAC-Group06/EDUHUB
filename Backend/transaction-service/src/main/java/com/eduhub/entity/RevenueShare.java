package com.eduhub.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "revenue_share")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RevenueShare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "revenue_id")
    private Integer id;

    @Column(name = "payment_id", nullable = false)
    private Integer paymentId;

    @Column(name = "payment", nullable = false)
    private Double payment;

    @Column(name = "commission_percentage", nullable = false)
    private Double commissionPercentage;

    @Column(name = "platform_share", nullable = false)
    private Double platformShare;

    @Column(name = "institute_share", nullable = false)
    private Double instituteShare;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }
}
