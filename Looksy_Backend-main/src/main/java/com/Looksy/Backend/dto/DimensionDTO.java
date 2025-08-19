package com.Looksy.Backend.dto;

import org.bson.types.ObjectId;
import java.util.List;
import java.util.ArrayList;

public class DimensionDTO {
    private ObjectId dimensionid;
    private ObjectId categoryid;
    private ObjectId subcategoryid;
    private ObjectId productid;
    private List<String> dimension; // Changed from String to List<String>

    // Default constructor
    public DimensionDTO() {
        this.dimension = new ArrayList<>();
    }

    // Getters and Setters
    public ObjectId getDimensionid() {
        return dimensionid;
    }

    public void setDimensionid(ObjectId dimensionid) {
        this.dimensionid = dimensionid;
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

    public List<String> getDimension() {
        return dimension;
    }

    public void setDimension(List<String> dimension) {
        this.dimension = dimension != null ? dimension : new ArrayList<>();
    }

    // Utility methods for easier access
    public void addDimension(String dim) {
        if (this.dimension == null) {
            this.dimension = new ArrayList<>();
        }
        if (!this.dimension.contains(dim)) {
            this.dimension.add(dim);
        }
    }

    public void removeDimension(String dim) {
        if (this.dimension != null) {
            this.dimension.remove(dim);
        }
    }

    public boolean hasDimension(String dim) {
        return this.dimension != null && this.dimension.contains(dim);
    }

    public int getDimensionCount() {
        return this.dimension != null ? this.dimension.size() : 0;
    }
}
