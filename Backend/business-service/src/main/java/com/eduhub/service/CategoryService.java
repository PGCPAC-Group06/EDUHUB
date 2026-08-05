package com.eduhub.service;


import java.util.List;

import com.eduhub.dto.CategoryResponse;
import com.eduhub.dto.CreateCategoryRequest;
import com.eduhub.dto.UpdateCategoryRequest;

public interface CategoryService {

    CategoryResponse createCategory(CreateCategoryRequest request);

    List<CategoryResponse> getAllCategories();

    CategoryResponse getCategoryById(Integer categoryId);

    CategoryResponse updateCategory(
            Integer categoryId,
            UpdateCategoryRequest request);

    void deleteCategory(Integer categoryId);
}