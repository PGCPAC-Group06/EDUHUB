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
        // Save as lowercase to match the MySQL ENUM definition
        return attribute.name().toLowerCase();
    }

    @Override
    public ApprovalStatus convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        // Read as uppercase to match Java Enum constants
        return ApprovalStatus.valueOf(dbData.toUpperCase());
    }
}
