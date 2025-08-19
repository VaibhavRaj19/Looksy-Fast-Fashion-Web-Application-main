package com.Looksy.Backend.service;

import com.Looksy.Backend.dto.SubcategoryRequest;
import com.Looksy.Backend.dto.SubcategoryResponse;
import com.Looksy.Backend.model.Category;
import com.Looksy.Backend.model.Subcategory;
import com.Looksy.Backend.repository.CategoryRepository;
import com.Looksy.Backend.repository.SubcategoryRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubcategoryService {

    @Autowired
    private SubcategoryRepository subcategoryRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    public SubcategoryResponse addNewSubcategory(SubcategoryRequest request) {
        Subcategory subcategory = new Subcategory();
        subcategory.setCategoryid(new ObjectId(request.getCategoryid()));
        subcategory.setSubcategoryname(request.getSubcategoryname());
        subcategory.setSubcategoryicon(request.getSubcategoryicon());
        subcategory.setBannerpriority(request.getBannerpriority());

        subcategory = subcategoryRepository.save(subcategory);
        return mapToResponse(subcategory);
    }

    public SubcategoryResponse editSubcategory(SubcategoryRequest request) {
        return subcategoryRepository.findById(request.getSubcategoryid())
                .map(existing -> {
                    existing.setCategoryid(new ObjectId(request.getCategoryid()));
                    existing.setSubcategoryname(request.getSubcategoryname());
                    existing.setBannerpriority(request.getBannerpriority());

                    if (request.getSubcategoryicon() != null && !request.getSubcategoryicon().isBlank()) {
                        existing.setSubcategoryicon(request.getSubcategoryicon());
                        // You may also delete old icon from Cloudinary using request.getOldIcon()
                    }

                    Subcategory updated = subcategoryRepository.save(existing);
                    return mapToResponse(updated);
                })
                .orElseThrow(() -> new RuntimeException("Subcategory not found"));
    }

    public List<SubcategoryResponse> getAllSubcategories() {
        return subcategoryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public boolean deleteSubcategory(String subcategoryid) {
        if (!subcategoryRepository.existsById(subcategoryid)) return false;
        subcategoryRepository.deleteById(subcategoryid);
        return true;
    }

    public List<SubcategoryResponse> getSubcategoriesByCategoryid(String categoryid) {
        ObjectId objectId = new ObjectId(categoryid);
        return subcategoryRepository.findByCategoryid(objectId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public Optional<SubcategoryResponse> getSubcategoryById(String subcategoryid) {
        return subcategoryRepository.findById(subcategoryid)
                .map(this::mapToResponse);
    }


    public List<SubcategoryResponse> getSubcategoriesByPriority(String priority) {
        List<Subcategory> subcategories = subcategoryRepository.findByBannerpriority(priority);
        return subcategories.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }



    private SubcategoryResponse mapToResponse(Subcategory subcategory) {
        String categoryIdStr = subcategory.getCategoryid().toHexString(); // Convert ObjectId to String
        String categoryname = categoryRepository.findById(categoryIdStr)
                .map(Category::getCategoryname)
                .orElse("");

        return new SubcategoryResponse(
                subcategory.getSubcategoryid(),
                categoryIdStr,
                categoryname,
                subcategory.getSubcategoryname(),
                subcategory.getSubcategoryicon(),
                subcategory.getBannerpriority()
        );
    }
}
