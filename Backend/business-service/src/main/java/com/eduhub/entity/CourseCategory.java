package com.eduhub.entity;


import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "course_category")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseCategory {

    @EmbeddedId
    private CourseCategoryId id;

}