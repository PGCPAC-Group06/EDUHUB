package com.eduhub.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class StatusConverter implements AttributeConverter<Status, String> {

    @Override
    public String convertToDatabaseColumn(Status attribute) {
        if (attribute == null) {
            return null;
        }
        // Save as lowercase to match the MySQL ENUM definition
        return attribute.name().toLowerCase();
    }

    @Override
    public Status convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        // Read as uppercase to match Java Enum constants
        return Status.valueOf(dbData.toUpperCase());
    }
}
