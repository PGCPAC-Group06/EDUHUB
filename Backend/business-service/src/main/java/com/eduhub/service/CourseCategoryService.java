package com.eduhub.service;


import java.util.List;

import com.eduhub.dto.AssignCategoryRequest;

public interface CourseCategoryService {

    String assignCategory(
            Integer userId,
            AssignCategoryRequest request);

    String removeCategory(
            Integer userId,
            AssignCategoryRequest request);

    List<Integer> getCategoriesByCourse(
            Integer userId,
            Integer courseId);

}