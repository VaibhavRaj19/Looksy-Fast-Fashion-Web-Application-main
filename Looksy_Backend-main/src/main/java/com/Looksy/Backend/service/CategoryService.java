package com.Looksy.Backend.service;

import com.Looksy.Backend.dto.CategoryResponse;
import com.Looksy.Backend.dto.CategoryRequest;
import com.Looksy.Backend.model.Category;
import com.Looksy.Backend.repository.CategoryRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private Cloudinary cloudinary;

    public CategoryResponse addNewCategory(String categoryname, MultipartFile icon) throws IOException {
        if (icon == null || icon.isEmpty()) {
            throw new IllegalArgumentException("Icon image is required");
        }
        Map uploadResult = cloudinary.uploader().upload(icon.getBytes(), ObjectUtils.emptyMap());
        String iconUrl = (String) uploadResult.get("secure_url");

        Category category = new Category(categoryname, iconUrl);
        category = categoryRepository.save(category);

        return new CategoryResponse(category.getCategoryid(), category.getCategoryname(), category.getIcon());
    }

    public CategoryResponse editCategory(CategoryRequest request) throws IOException {
        Category category = categoryRepository.findById(request.getCategoryid())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        category.setCategoryname(request.getCategoryname());

        MultipartFile newIcon = request.getIcon();
        if (newIcon != null && !newIcon.isEmpty()) {
            // Delete old icon on Cloudinary if oldpic URL is provided
            if (request.getOldpic() != null && !request.getOldpic().isEmpty()) {
                String publicId = extractPublicIdFromUrl(request.getOldpic());
                if (publicId != null) {
                    cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
                }
            }
            Map uploadResult = cloudinary.uploader().upload(newIcon.getBytes(), ObjectUtils.emptyMap());
            category.setIcon((String) uploadResult.get("secure_url"));
        }

        category = categoryRepository.save(category);

        return new CategoryResponse(category.getCategoryid(), category.getCategoryname(), category.getIcon());
    }

    public void deleteCategory(String categoryid) throws IOException {
        Category category = categoryRepository.findById(categoryid)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Delete icon from Cloudinary (extract publicId from full URL)
        if (category.getIcon() != null && !category.getIcon().isEmpty()) {
            String publicId = extractPublicIdFromUrl(category.getIcon());
            if (publicId != null) {
                cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            }
        }

        categoryRepository.deleteById(categoryid);
    }

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(cat -> new CategoryResponse(cat.getCategoryid(), cat.getCategoryname(), cat.getIcon()))
                .collect(Collectors.toList());
    }

    private String extractPublicIdFromUrl(String url) {
        // Cloudinary URLs look like:
        // https://res.cloudinary.com/<cloud>/image/upload/v1234567890/public_id.jpg
        int lastSlashIndex = url.lastIndexOf('/');
        int dotIndex = url.lastIndexOf('.');
        if (lastSlashIndex == -1 || dotIndex == -1 || dotIndex < lastSlashIndex) {
            return null;
        }
        return url.substring(lastSlashIndex + 1, dotIndex);
    }
}
