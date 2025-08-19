package com.Looksy.Backend.model;

import jakarta.validation.constraints.NotBlank;
import org.bson.types.ObjectId; // Import ObjectId
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.List;

@Document(collection = "productimages")
public class ProductImages {

    @Id
    private String id;

    @NotBlank
    private ObjectId categoryid; // Change to ObjectId

    @NotBlank
    private ObjectId subcategoryid; // Change to ObjectId

    @NotBlank
    @Indexed(unique = true) // Equivalent to UNIQUE KEY in MySQL
    private ObjectId productid; // Change to ObjectId

    @NotBlank
    private List<String> productimages; // Store as a list of image URLs

    // Constructors
    public ProductImages() {}

    public ProductImages(ObjectId categoryid, ObjectId subcategoryid, ObjectId productid, List<String> productimages) {
        this.categoryid = categoryid;
        this.subcategoryid = subcategoryid;
        this.productid = productid;
        this.productimages = productimages;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ObjectId getCategoryid() {
        return categoryid;
    }

    public void setCategoryid(ObjectId categoryid) {
        this.categoryid = categoryid;
    }

    public ObjectId getSubcategoryid() {
        return subcategoryid;
    }

    public void setSubcategoryid(ObjectId subcategoryid) {
        this.subcategoryid = subcategoryid;
    }

    public ObjectId getProductid() {
        return productid;
    }

    public void setProductid(ObjectId productid) {
        this.productid = productid;
    }

    public List<String> getProductimages() {
        return productimages;
    }

    public void setProductimages(List<String> productimages) {
        this.productimages = productimages;
    }
}
