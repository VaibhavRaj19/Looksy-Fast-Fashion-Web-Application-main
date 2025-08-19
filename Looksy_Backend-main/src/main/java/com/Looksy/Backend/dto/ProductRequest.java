package com.Looksy.Backend.dto;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
public class ProductRequest {

    @NotBlank(message = "Product name is required")
    private String productname;

    @NotBlank(message = "Offer price is required")
    private String offerprice;

    @NotBlank(message = "Stock is required")
    private String stock;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Rating is required")
    private String rating;

    @NotBlank(message = "Status is required")
    private String status;

    @NotBlank(message = "Sale status is required")
    private String salestatus;

    @NotBlank(message = "Price is required")
    private String price;

    @NotNull(message = "Category ID is required")
    private ObjectId categoryId; // Changed to ObjectId

    @NotNull(message = "Subcategory ID is required")
    private ObjectId subCategoryId; // Changed to ObjectId

    private MultipartFile icon; // Optional file upload
}
