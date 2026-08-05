package com.eduhub.entity;


import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseCategoryId implements Serializable {
    
	private static final long serialVersionUID = 1L;
   
	@Column(name = "course_id")
    private Integer courseId;

    @Column(name = "category_id")
    private Integer categoryId;

    @Override
    public boolean equals(Object o) {

        if (this == o)
            return true;

        if (!(o instanceof CourseCategoryId))
            return false;

        CourseCategoryId that = (CourseCategoryId) o;

        return Objects.equals(courseId, that.courseId)
                && Objects.equals(categoryId, that.categoryId);
    }

    @Override
    public int hashCode() {

        return Objects.hash(courseId, categoryId);
    }

}