package com.Looksy.Backend.controller;

import com.Looksy.Backend.dto.CategoryRequest;
import com.Looksy.Backend.dto.CategoryResponse;
import com.Looksy.Backend.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Add new category
    @PostMapping("/add_new_category")
    public ResponseEntity<?> addNewCategory(@Valid @ModelAttribute CategoryRequest request, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(
                    Map.of("status", false, "message", result.getFieldError().getDefaultMessage()));
        }
        try {
            CategoryResponse category = categoryService.addNewCategory(request.getCategoryname(), request.getIcon());
            return ResponseEntity.ok(Map.of(
                    "status", true,
                    "message", "Category added successfully",
                    "category", category));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    Map.of("status", false, "message", e.getMessage()));
        }
    }

    // Get all categories
    @GetMapping("/display_all_category")
    public ResponseEntity<?> displayAllCategory() {
        return ResponseEntity.ok(Map.of(
                "status", true,
                "categories", categoryService.getAllCategories()));
    }

    // Edit category (with or without icon update)
    @PostMapping("/edit_category_data")
    public ResponseEntity<?> editCategoryWithIcon(@Valid @ModelAttribute CategoryRequest request, BindingResult result) {
        if (result.hasErrors() || request.getCategoryid() == null || request.getCategoryid().isEmpty()) {
            String errorMessage = result.hasErrors()
                    ? result.getFieldError().getDefaultMessage()
                    : "Category ID is required";
            return ResponseEntity.badRequest().body(Map.of("status", false, "message", errorMessage));
        }
        try {
            CategoryResponse updated = categoryService.editCategory(request);
            return ResponseEntity.ok(Map.of(
                    "status", true,
                    "message", "Category updated successfully",
                    "category", updated));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(
                    Map.of("status", false, "message", e.getMessage()));
        }
    }

    // Delete category by ID
    @PostMapping("/delete_category_data")
    public ResponseEntity<?> deleteCategory(@RequestBody Map<String, String> payload) {
        String categoryid = payload.get("categoryid");
        if (categoryid == null || categoryid.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("status", false, "message", "Category ID is required"));
        }
        try {
            categoryService.deleteCategory(categoryid);
            return ResponseEntity.ok(Map.of("status", true, "message", "Category deleted successfully"));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(
                    Map.of("status", false, "message", e.getMessage()));
        }
    }
}
