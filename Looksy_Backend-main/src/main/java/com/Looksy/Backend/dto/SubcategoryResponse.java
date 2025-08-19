package com.Looksy.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubcategoryResponse {
    private String subcategoryid;
    private String categoryid;
    private String categoryname;
    private String subcategoryname;
    private String subcategoryicon;
    private String bannerpriority;
}
