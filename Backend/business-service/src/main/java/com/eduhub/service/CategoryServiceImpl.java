package com.eduhub.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eduhub.dto.CategoryResponse;
import com.eduhub.dto.CreateCategoryRequest;
import com.eduhub.dto.UpdateCategoryRequest;
import com.eduhub.entity.Category;
import com.eduhub.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public CategoryResponse createCategory(CreateCategoryRequest request) {

        if (categoryRepository.existsByCategoryName(request.getCategoryName())) {
            throw new RuntimeException("Category already exists.");
        }

        Category category = new Category();

        category.setCategoryName(request.getCategoryName());

        Category savedCategory = categoryRepository.save(category);

        CategoryResponse response = new CategoryResponse();

        BeanUtils.copyProperties(savedCategory, response);

        return response;
    }

    @Override
    public List<CategoryResponse> getAllCategories() {

        List<Category> categories = categoryRepository.findAll();

        return categories.stream().map(category -> {

            CategoryResponse response = new CategoryResponse();

            BeanUtils.copyProperties(category, response);

            return response;

        }).collect(Collectors.toList());
    }

    @Override
    public CategoryResponse getCategoryById(Integer categoryId) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() ->
                        new RuntimeException("Category not found."));

        CategoryResponse response = new CategoryResponse();

        BeanUtils.copyProperties(category, response);

        return response;
    }

    @Override
    public CategoryResponse updateCategory(
            Integer categoryId,
            UpdateCategoryRequest request) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() ->
                        new RuntimeException("Category not found."));

        category.setCategoryName(request.getCategoryName());

        Category updatedCategory = categoryRepository.save(category);

        CategoryResponse response = new CategoryResponse();

        BeanUtils.copyProperties(updatedCategory, response);

        return response;
    }

    @Override
    public void deleteCategory(Integer categoryId) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() ->
                        new RuntimeException("Category not found."));

        categoryRepository.delete(category);
    }
}

