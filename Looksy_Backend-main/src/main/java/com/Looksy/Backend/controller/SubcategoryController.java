package com.Looksy.Backend.controller;

import com.Looksy.Backend.dto.SubcategoryRequest;
import com.Looksy.Backend.dto.SubcategoryResponse;
import com.Looksy.Backend.service.CloudinaryService;
import com.Looksy.Backend.service.SubcategoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/subcategory")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SubcategoryController {

    @Autowired
    private SubcategoryService subcategoryService;
   
    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private ObjectMapper objectMapper;

    private final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    @PostMapping("/add")
    public ResponseEntity<?> addNewSubcategory(
            @RequestPart("subcategoryData") String subcategoryData,
            @RequestPart("icon") MultipartFile iconFile
    ) {
        try {
            if (iconFile.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("status", false, "error", "Icon file is empty"));
            }

            SubcategoryRequest request = objectMapper.readValue(subcategoryData, SubcategoryRequest.class);

            Set<ConstraintViolation<SubcategoryRequest>> violations = validator.validate(request);
            if (!violations.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("status", false, "message", "Validation failed"));
            }

            String iconUrl = cloudinaryService.uploadFile(iconFile);
            request.setSubcategoryicon(iconUrl);

            SubcategoryResponse response = subcategoryService.addNewSubcategory(request);
            return ResponseEntity.ok(Map.of("status", true, "message", "Subcategory added successfully", "subcategory", response));

        } catch (IOException e) {
            return ResponseEntity.badRequest().body(Map.of("status", false, "error", "Invalid subcategory data format"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("status", false, "error", e.getMessage()));
        }
    }

    @PostMapping("/edit_subcategory_data")
    public ResponseEntity<?> editSubcategoryWithIcon(
            @RequestPart("subcategoryData") String subcategoryData,
            @RequestPart(value = "icon", required = false) MultipartFile iconFile
    ) {
        try {
            SubcategoryRequest request = objectMapper.readValue(subcategoryData, SubcategoryRequest.class);

            Set<ConstraintViolation<SubcategoryRequest>> violations = validator.validate(request);
            if (!violations.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("status", false, "message", "Validation failed"));
            }

            if (iconFile != null && !iconFile.isEmpty()) {
                String newIconUrl = cloudinaryService.uploadFile(iconFile);

                if (request.getOldIcon() != null && !request.getOldIcon().isBlank()) {
                    cloudinaryService.deleteFile(request.getOldIcon());
                }

                request.setSubcategoryicon(newIconUrl);
            }

            SubcategoryResponse updated = subcategoryService.editSubcategory(request);
            return ResponseEntity.ok(Map.of("status", true, "message", "Subcategory updated successfully", "subcategory", updated));

        } catch (IOException e) {
            return ResponseEntity.badRequest().body(Map.of("status", false, "message", "Invalid subcategory data format"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("status", false, "message", "Something went wrong", "error", e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<SubcategoryResponse>> getAllSubcategories() {
        return ResponseEntity.ok(subcategoryService.getAllSubcategories());
    }

    @GetMapping("/{subcategoryid}")
    public ResponseEntity<?> getSubcategoryById(@PathVariable String subcategoryid) {
        return subcategoryService.getSubcategoryById(subcategoryid)
                .map(response -> ResponseEntity.ok(Map.of("status", true, "subcategory", response)))
                .orElseGet(() -> ResponseEntity.badRequest().body(Map.of("status", false, "message", "Subcategory not found")));
    }

    @PostMapping("/delete/{subcategoryid}")
    public ResponseEntity<?> deleteSubcategory(@PathVariable String subcategoryid) {
        boolean deleted = subcategoryService.deleteSubcategory(subcategoryid);
        return deleted
                ? ResponseEntity.ok(Map.of("status", true, "message", "Subcategory deleted successfully"))
                : ResponseEntity.badRequest().body(Map.of("status", false, "message", "Subcategory not found"));
    }


    @GetMapping("/by-category/{categoryid}")
    public ResponseEntity<List<SubcategoryResponse>> getByCategoryid(@PathVariable String categoryid) {
        return ResponseEntity.ok(subcategoryService.getSubcategoriesByCategoryid(categoryid));
    }

    @GetMapping("/by-priority/{priority}")
    public ResponseEntity<List<SubcategoryResponse>> getSubcategoriesByPriority(@PathVariable String priority) {
        List<SubcategoryResponse> subcategories = subcategoryService.getSubcategoriesByPriority(priority);
        return ResponseEntity.ok(subcategories);
    }

}
