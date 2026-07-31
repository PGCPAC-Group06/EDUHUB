package com.eduhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.eduhub.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
