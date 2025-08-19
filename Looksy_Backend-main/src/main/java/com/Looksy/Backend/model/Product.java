package com.Looksy.Backend.model;

import org.bson.types.ObjectId; // Import ObjectId
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

@Document(collection = "products")
public class Product {
    @Id
    private ObjectId id; // Changed to ObjectId

    @NotBlank
    private ObjectId categoryid;

    @NotBlank
    private ObjectId subcategoryid;

    @NotBlank
    private String productname;

    @NotBlank
    private String price;

    @NotBlank
    private String offerprice;

    private int stock;

    @NotBlank
    private String description;

    @NotBlank
    private String rating;

    @NotBlank
    private String status;

    @NotBlank
    private String salestatus;

    private List<String> picture;

    private String icon;    // Single icon file

    // Constructors
    public Product() {}

    public Product(ObjectId id, ObjectId categoryid, ObjectId subcategoryid, String productname,
                   String price, String offerprice, int stock, String description,
                   String rating, String status, String salestatus) {
        this.id = id; // Initialize ObjectId
        this.categoryid = categoryid;
        this.subcategoryid = subcategoryid;
        this.productname = productname;
        this.price = price;
        this.offerprice = offerprice;
        this.stock = stock;
        this.description = description;
        this.rating = rating;
        this.status = status;
        this.salestatus = salestatus;
    }

    // Getters and Setters
    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
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

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getOfferprice() {
        return offerprice;
    }

    public void setOfferprice(String offerprice) {
        this.offerprice = offerprice;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSalestatus() {
        return salestatus;
    }

    public void setSalestatus(String salestatus) {
        this.salestatus = salestatus;
    }

    public List<String> getPicture() {
        return picture;
    }

    public void setPicture(List<String> picture) {
        this.picture = picture;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) { // Ensure this method exists
        this.icon = icon;
    }
}