package com.Looksy.Backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SubcategoryRequest {

    @NotBlank(message = "Category ID is required")
    private String categoryid;

    @NotBlank(message = "Subcategory name is required")
    private String subcategoryname;

    private String subcategoryid;
    private String bannerpriority;
    private String oldIcon;
    private String subcategoryicon;
}
