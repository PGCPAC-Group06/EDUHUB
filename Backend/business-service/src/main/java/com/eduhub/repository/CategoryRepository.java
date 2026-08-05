package com.eduhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD


import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.eduhub.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Optional<Category> findByCategoryName(String categoryName);

    boolean existsByCategoryName(String categoryName);

=======
import com.eduhub.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
}
