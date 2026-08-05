package com.eduhub.controller;

<<<<<<< HEAD

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.CreateCategoryRequest;
import com.eduhub.dto.UpdateCategoryRequest;
import com.eduhub.service.CategoryService;

import jakarta.validation.Valid;


=======
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.eduhub.dto.CategoryDTO;
import com.eduhub.service.CategoryService;
import java.util.List;
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

<<<<<<< HEAD

    @Autowired
    private CategoryService categoryService;



    @PostMapping
    public ResponseEntity<?> createCategory(

            Authentication authentication,

            @Valid @RequestBody CreateCategoryRequest request) {


        try {


            String role =
                    authentication
                    .getAuthorities()
                    .iterator()
                    .next()
                    .getAuthority();



            if(!role.equals("ROLE_ADMIN")) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body("Only Admin can create categories.");
            }



            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(
                        categoryService
                        .createCategory(request)
                    );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }





    @GetMapping
    public ResponseEntity<?> getAllCategories() {


        return ResponseEntity.ok(
                categoryService.getAllCategories()
        );

    }





    @GetMapping("/{categoryId}")
    public ResponseEntity<?> getCategoryById(

            @PathVariable Integer categoryId) {


        return ResponseEntity.ok(
                categoryService
                .getCategoryById(categoryId)
        );

    }





    @PutMapping("/{categoryId}")
    public ResponseEntity<?> updateCategory(

            Authentication authentication,

            @PathVariable Integer categoryId,

            @Valid @RequestBody UpdateCategoryRequest request) {


        try {


            String role =
                    authentication
                    .getAuthorities()
                    .iterator()
                    .next()
                    .getAuthority();



            if(!role.equals("ROLE_ADMIN")) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body("Only Admin can update categories.");
            }



            return ResponseEntity.ok(
                    categoryService
                    .updateCategory(
                            categoryId,
                            request
                    )
            );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }





    @DeleteMapping("/{categoryId}")
    public ResponseEntity<?> deleteCategory(

            Authentication authentication,

            @PathVariable Integer categoryId) {


        try {


            String role =
                    authentication
                    .getAuthorities()
                    .iterator()
                    .next()
                    .getAuthority();



            if(!role.equals("ROLE_ADMIN")) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body("Only Admin can delete categories.");
            }



            categoryService.deleteCategory(categoryId);


            return ResponseEntity.ok(
                    "Category deleted successfully."
            );


        } catch(Exception e) {


            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

}
=======
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<CategoryDTO> getAllCategories() {
        return categoryService.getAllCategories();
    }
}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
