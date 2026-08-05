package com.eduhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.eduhub.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Optional<Category> findByCategoryName(String categoryName);

    boolean existsByCategoryName(String categoryName);

}
