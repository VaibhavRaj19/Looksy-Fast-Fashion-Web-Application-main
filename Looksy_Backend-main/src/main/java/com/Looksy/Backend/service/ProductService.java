package com.Looksy.Backend.service;

import com.Looksy.Backend.model.Dimension;
import com.Looksy.Backend.model.Product;
import com.Looksy.Backend.repository.DimensionRepository;
import com.Looksy.Backend.repository.ProductRepository;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.MongoTemplate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class ProductService {

    @Autowired
    private DimensionRepository dimensionRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private ProductRepository productRepository;

    // Add new product
    public Product addProduct(Product product) {
        try {
            return productRepository.save(product);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save product: " + e.getMessage());
        }
    }

    public List<Product> getProductsBySaleStatus(String saleStatus) {
        try {
            return productRepository.findBySalestatus(saleStatus);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch products by sale status: " + e.getMessage());
        }
    }

    // Get all products
    public List<Product> getAllProducts() {
        try {
            return productRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch products: " + e.getMessage());
        }
    }

    // Get product by ID
    public Product getProductById(ObjectId id) { // Change to ObjectId
        try {
            Optional<Product> product = productRepository.findById(id);
            return product.orElse(null);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch product: " + e.getMessage());
        }
    }

    // Update product
    public Product updateProduct(Product product) {
        try {
            if (product.getId() == null || !productRepository.existsById(product.getId())) {
                throw new RuntimeException("Product not found for update");
            }
            return productRepository.save(product);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update product: " + e.getMessage());
        }
    }

    // Delete product
    public void deleteProduct(ObjectId id) { // Change to ObjectId
        try {
            if (!productRepository.existsById(id)) {
                throw new RuntimeException("Product not found with id: " + id);
            }
            productRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete product: " + e.getMessage());
        }
    }

    // Get products by category and subcategory
    public List<Product> getProductsByCategoryAndSubcategory(String categoryId, String subcategoryId) {
        try {
            ObjectId categoryObjectId = new ObjectId(categoryId);
            ObjectId subcategoryObjectId = new ObjectId(subcategoryId);
            return productRepository.findByCategoryidAndSubcategoryid(categoryObjectId, subcategoryObjectId);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch products by category and subcategory: " + e.getMessage());
        }
    }

    // Get products by category only
    public List<Product> getProductsByCategory(String categoryId) {
        try {
            ObjectId categoryObjectId = new ObjectId(categoryId);
            return productRepository.findByCategoryid(categoryObjectId);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch products by category: " + e.getMessage());
        }
    }

    // Get products by status
    public List<Product> getProductsByStatus(String status) {
        try {
            return productRepository.findByStatus(status);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch products by status: " + e.getMessage());
        }
    }

    public List<Product> searchProductsByName(String productName) {
        try {
            return productRepository.findByProductnameContainingIgnoreCase(productName);
        } catch (Exception e) {
            throw new RuntimeException("Failed to search products: " + e.getMessage());
        }
    }

    public List<Document> fetchAllProductsLTH() {
        return mongoTemplate.aggregate(
                newAggregation(
                        lookup("category", "categoryid", "_id", "categoryDetails"),
                        lookup("subcategory", "subcategoryid", "_id", "subcategoryDetails"),
                        project("productname", "price", "categoryDetails.categoryname", "subcategoryDetails.subcategoryname")
                ),
                "products",
                Document.class
        ).getMappedResults();
    }

    public List<Document> fetchAllProductsWithCategoryAndSubcategory() {
        LookupOperation lookupCategory = Aggregation.lookup("category", "categoryid", "_id", "categoryDetails");
        LookupOperation lookupSubcategory = Aggregation.lookup("subcategory", "subcategoryid", "_id", "subcategoryDetails");

        ProjectionOperation project = Aggregation.project("productname", "price")
                .and("categoryDetails.categoryname").as("categoryName")
                .and("subcategoryDetails.subcategoryname").as("subcategoryName");

        SortOperation sortByPrice = Aggregation.sort(Sort.by(Sort.Order.desc("price")));

        Aggregation aggregation = Aggregation.newAggregation(lookupCategory, lookupSubcategory, project, sortByPrice);

        AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "products", Document.class);
        return results.getMappedResults();
    }

    public List<Product> findAllById(Iterable<ObjectId> ids) { // Change to ObjectId
        try {
            return productRepository.findAllById(ids);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch products by IDs: " + e.getMessage());
        }
    }

    public List<Product> getProductsBySize(String size) {
        List<Dimension> dimensions = dimensionRepository.findByDimension(size);

        if (dimensions.isEmpty()) {
            return Collections.emptyList(); // Return an empty list if no dimensions found
        }

        List<ObjectId> productIds = dimensions.stream()
                .map(d -> d.getProductid()) // Assuming getProductid() returns ObjectId
                .distinct()
                .collect(Collectors.toList());

        return productRepository.findByIdIn(productIds);
    }

    public List<Product> getProductsSortedByPrice(String order) {
        try {
            Sort sort = order.equalsIgnoreCase("desc") ? Sort.by(Sort.Order.desc("price")) : Sort.by(Sort.Order.asc("price"));
            return productRepository.findAll(sort);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch products sorted by price: " + e.getMessage());
        }
    }


}
