package com.eduhub.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class ApprovalStatusConverter implements AttributeConverter<ApprovalStatus, String> {

    @Override
    public String convertToDatabaseColumn(ApprovalStatus attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.name().toLowerCase();
    }

    @Override
    public ApprovalStatus convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) {
            return null;
        }
        for (ApprovalStatus status : ApprovalStatus.values()) {
            if (status.name().equalsIgnoreCase(dbData.trim())) {
                return status;
            }
        }
        return ApprovalStatus.PENDING;
    }
}
