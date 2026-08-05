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
<<<<<<< HEAD
        // Save as lowercase to match the MySQL ENUM definition
=======
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
        return attribute.name().toLowerCase();
    }

    @Override
    public Status convertToEntityAttribute(String dbData) {
<<<<<<< HEAD
        if (dbData == null) {
            return null;
        }
        // Read as uppercase to match Java Enum constants
        return Status.valueOf(dbData.toUpperCase());
=======
        if (dbData == null || dbData.trim().isEmpty()) {
            return null;
        }
        for (Status status : Status.values()) {
            if (status.name().equalsIgnoreCase(dbData.trim())) {
                return status;
            }
        }
        return Status.ACTIVE;
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
    }
}
