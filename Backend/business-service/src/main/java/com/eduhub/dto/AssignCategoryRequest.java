package com.eduhub.dto;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssignCategoryRequest {

    @NotNull
    private Integer courseId;

    @NotNull
    private Integer categoryId;

}