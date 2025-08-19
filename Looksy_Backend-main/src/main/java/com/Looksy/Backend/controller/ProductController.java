package com.Looksy.Backend.controller;

import com.Looksy.Backend.model.Product;
import com.Looksy.Backend.service.CloudinaryService;
import com.Looksy.Backend.service.ProductImagesService;
import com.Looksy.Backend.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductImagesService productImagesService;

    @Autowired
    private CloudinaryService cloudinaryService;

    // ✅ Add New Product
    @PostMapping("/add_new_product")
    public ResponseEntity<Map<String, Object>> addNewProduct(
            @RequestPart("data") String productJson,
            @RequestPart(value = "icon", required = false) MultipartFile iconFile,
            @RequestPart(value = "picture", required = false) MultipartFile[] pictureFiles) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Product product = objectMapper.readValue(productJson, Product.class);

            // Upload icon
            if (iconFile != null && !iconFile.isEmpty()) {
                String iconUrl = cloudinaryService.uploadFile(iconFile);
                product.setIcon(iconUrl);
            }

            // Upload pictures
            if (pictureFiles != null && pictureFiles.length > 0) {
                List<String> pictureUrls = new ArrayList<>();
                for (MultipartFile pictureFile : pictureFiles) {
                    if (!pictureFile.isEmpty()) {
                        String pictureUrl = cloudinaryService.uploadFile(pictureFile);
                        pictureUrls.add(pictureUrl);
                    }
                }
                product.setPicture(pictureUrls);
            }

            Product savedProduct = productService.addProduct(product);
            return ResponseEntity.ok(Map.of(
                    "status", true,
                    "message", "Product added successfully",
                    "data", savedProduct
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "status", false,
                    "error", e.getMessage()
            ));
        }
    }



    // ✅ Display All Products
    @GetMapping("/display_all_product")
    public ResponseEntity<Map<String, Object>> displayAllProduct() {
        try {
            List<Product> products = productService.getAllProducts();
            return ResponseEntity.ok(Map.of("data", products));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "data", "",
                    "error", e.getMessage()
            ));
        }
    }

    @PostMapping("/by_salestatus")
    public ResponseEntity<Map<String, Object>> getProductsBySaleStatus(@RequestBody Map<String, String> request) {
        try {
            String saleStatus = request.get("salestatus");
            if (saleStatus == null || saleStatus.isEmpty()) {
                return ResponseEntity.status(400).body(Map.of(
                        "status", false,
                        "error", "Missing salestatus parameter"
                ));
            }
            List<Product> products = productService.getProductsBySaleStatus(saleStatus);
            return ResponseEntity.ok(Map.of("data", products));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "status", false,
                    "error", e.getMessage()
            ));
        }
    }



    // ✅ Edit Product Data - Changed from @PutMapping to @PostMapping
    @PostMapping("/edit_product_data")
    public ResponseEntity<Map<String, Object>> editProductData(
            @RequestPart("data") String productJson,
            @RequestPart(value = "icon", required = false) MultipartFile iconFile,
            @RequestPart(value = "picture", required = false) MultipartFile[] pictureFiles) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Product product = objectMapper.readValue(productJson, Product.class);

            if (product.getId() == null) {
                return ResponseEntity.status(400).body(Map.of(
                        "status", false,
                        "error", "Product ID is required"
                ));
            }

            // Upload new icon if provided
            if (iconFile != null && !iconFile.isEmpty()) {
                String iconUrl = cloudinaryService.uploadFile(iconFile);
                product.setIcon(iconUrl);
            }

            // Upload new pictures if provided
            if (pictureFiles != null && pictureFiles.length > 0) {
                List<String> pictureUrls = new ArrayList<>();
                for (MultipartFile file : pictureFiles) {
                    if (!file.isEmpty()) {
                        String url = cloudinaryService.uploadFile(file);
                        pictureUrls.add(url);
                    }
                }
                product.setPicture(pictureUrls); // Replacing old pictures
            }

            Product updated = productService.updateProduct(product);

            return ResponseEntity.ok(Map.of(
                    "status", true,
                    "message", "Product updated successfully",
                    "data", updated
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "status", false,
                    "error", e.getMessage()
            ));
        }
    }

    // ✅ Delete Product
    @PostMapping("/delete_product_data")
    public ResponseEntity<Map<String, Object>> deleteProductData(@RequestBody Map<String, String> request) {
        try {
            String productId = request.get("productid");
            if (productId == null) {
                return ResponseEntity.status(400).body(Map.of(
                        "status", false,
                        "error", "Product ID is required"
                ));
            }

            productService.deleteProduct(new ObjectId(productId)); // Convert to ObjectId
            return ResponseEntity.ok(Map.of(
                    "status", true,
                    "message", "Product deleted successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "status", false,
                    "error", e.getMessage()
            ));
        }
    }


    // ✅ Add Additional Product Images
    @PostMapping("/add_product_images")
    public ResponseEntity<Map<String, Object>> addProductImages(
            @RequestPart("productid") String productId,
            @RequestPart("images") List<MultipartFile> images) {

        try {
            if (images == null || images.isEmpty()) {
                return ResponseEntity.status(400).body(Map.of(
                        "status", false,
                        "error", "No images uploaded"
                ));
            }

            List<String> uploadedImageUrls = productImagesService.addImagesToProduct(productId, images);

            return ResponseEntity.ok(Map.of(
                    "status", true,
                    "message", "Images added successfully",
                    "images", uploadedImageUrls
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "status", false,
                    "error", e.getMessage()
            ));
        }
    }

    @PostMapping("/picture")
    public ResponseEntity<Map<String, Object>> fetchAllPictures(@RequestBody Map<String, String> request) {
        String categoryId = request.get("categoryid");
        String subcategoryId = request.get("subcategoryid");
        String productId = request.get("productid");

        if (categoryId == null || subcategoryId == null || productId == null) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", false,
                    "error", "Missing required parameters"
            ));
        }

        try {
            List<String> images = productImagesService.getProductImages(
                    new ObjectId(categoryId),
                    new ObjectId(subcategoryId),
                    new ObjectId(productId)
            );

            if (images.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of(
                        "status", false,
                        "message", "No images found."
                ));
            }

            return ResponseEntity.ok(Map.of("status", true, "data", images));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "status", false,
                    "error", e.getMessage()
            ));
        }
    }

    @PostMapping("/search")
    public ResponseEntity<Map<String, Object>> searchProducts(@RequestBody Map<String, String> request) {
        try {
            String productName = request.get("productname");
            if (productName == null || productName.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "status", false,
                        "error", "Missing productname parameter"
                ));
            }
            List<Product> products = productService.searchProductsByName(productName);
            return ResponseEntity.ok(Map.of("data", products));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "status", false,
                    "error", e.getMessage()
            ));
        }
    }

    // ✅ Update Product Icon
    @PostMapping("/update_icon")
    public ResponseEntity<Map<String, Object>> updateIcon(
            @RequestPart("productid") String productId,
            @RequestPart("icon") MultipartFile iconFile) {

        try {
            if (iconFile == null || iconFile.isEmpty()) {
                return ResponseEntity.status(400).body(Map.of(
                        "status", false,
                        "error", "File upload failed"
                ));
            }

            Product existingProduct = productService.getProductById(new ObjectId(productId)); // Convert to ObjectId
            if (existingProduct == null) {
                return ResponseEntity.status(404).body(Map.of(
                        "status", false,
                        "error", "Product not found"
                ));
            }

            // Optionally delete old icon from Cloudinary if needed (not implemented here)

            String iconUrl = cloudinaryService.uploadFile(iconFile);
            existingProduct.setIcon(iconUrl);
            productService.updateProduct(existingProduct);

            return ResponseEntity.ok(Map.of(
                    "status", true,
                    "message", "Product icon updated successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "status", false,
                    "error", e.getMessage()
            ));
        }
    }

    // ✅ Fetch Products by Category & Subcategory
    @PostMapping("/fetch_all_product")
    public ResponseEntity<Map<String, Object>> fetchAllProduct(@RequestBody Map<String, String> request) {
        try {
            String categoryId = request.get("categoryid");
            String subcategoryId = request.get("subcategoryid");

            List<Product> products = productService.getProductsByCategoryAndSubcategory(categoryId, subcategoryId);
            return ResponseEntity.ok(Map.of("data", products));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "data", "",
                    "error", e.getMessage()
            ));
        }
    }

    // New endpoint to fetch products by a list of IDs
    @PostMapping("/fetch_by_ids")
    public ResponseEntity<Map<String, Object>> fetchProductsByIds(@RequestBody List<String> ids) {
        try {
            if (ids == null || ids.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "status", false,
                        "error", "Missing product IDs"
                ));
            }
            List<Product> products = productService.findAllById(ids.stream().map(ObjectId::new).collect(Collectors.toList())); // Convert to ObjectId
            return ResponseEntity.ok(Map.of("data", products));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "status", false,
                    "error", e.getMessage()
            ));
        }
    }

    @GetMapping("/by-size")
    public ResponseEntity<?> getProductsBySize(@RequestParam String size) {
        List<Product> products = productService.getProductsBySize(size);
        return ResponseEntity.ok(Map.of("status", true, "data", products));
    }


    @GetMapping("/sorted-by-price")
    public ResponseEntity<Map<String, Object>> getProductsSortedByPrice(
            @RequestParam(value = "order", defaultValue = "asc") String order) {
        try {
            List<Product> products = productService.getProductsSortedByPrice(order);
            return ResponseEntity.ok(Map.of("data", products));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "status", false,
                    "error", e.getMessage()
            ));
        }
    }


}
