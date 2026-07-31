package com.eduhub.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eduhub.dto.CategoryDTO;
import com.eduhub.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(c -> new CategoryDTO(c.getCategoryId(), c.getCategoryName()))
                .collect(Collectors.toList());
    }
}
