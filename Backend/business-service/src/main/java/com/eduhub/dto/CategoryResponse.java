package com.eduhub.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {

    private Integer categoryId;

    private String categoryName;

    @JsonProperty("category_id")
    public Integer getCategory_id() { return categoryId; }

    @JsonProperty("category_name")
    public String getCategory_name() { return categoryName; }
}
