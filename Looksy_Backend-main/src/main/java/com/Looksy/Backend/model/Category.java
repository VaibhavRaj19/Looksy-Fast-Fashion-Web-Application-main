// Category.java
package com.Looksy.Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Document(collection = "category")
public class Category {

    @Id
    private String categoryid;

    @NotBlank(message = "Category name is required")
    @Size(min = 2, max = 50, message = "Category name must be between 2 and 50 characters")
    private String categoryname;

    @NotBlank(message = "Icon URL is required")
    private String icon;

    public Category() {}

    public Category(String categoryname, String icon) {
        this.categoryname = categoryname;
        this.icon = icon;
    }

    public String getCategoryid() { return categoryid; }
    public void setCategoryid(String categoryid) { this.categoryid = categoryid; }

    public String getCategoryname() { return categoryname; }
    public void setCategoryname(String categoryname) { this.categoryname = categoryname; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
}