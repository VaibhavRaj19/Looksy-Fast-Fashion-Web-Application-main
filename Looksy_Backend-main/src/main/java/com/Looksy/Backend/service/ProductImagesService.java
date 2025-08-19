package com.Looksy.Backend.service;

import com.Looksy.Backend.model.ProductImages;
import com.Looksy.Backend.repository.ProductImagesRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductImagesService {

    @Autowired
    private ProductImagesRepository productImagesRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    public ProductImages getByProductId(ObjectId productId) {
        return productImagesRepository.findByProductid(productId);
    }

    public void addProductImages(ProductImages productImages) {
        productImagesRepository.save(productImages);
    }

    public void updateProductImages(ProductImages productImages) {
        productImagesRepository.save(productImages);
    }

    // ✅ Add Images to a Product
    public List<String> addImagesToProduct(String productId, List<MultipartFile> imageFiles) throws Exception {
        ObjectId productObjId = new ObjectId(productId);
        List<String> uploadedUrls = new ArrayList<>();

        for (MultipartFile file : imageFiles) {
            if (!file.isEmpty()) {
                String url = cloudinaryService.uploadFile(file);
                uploadedUrls.add(url);
            }
        }

        ProductImages existing = productImagesRepository.findByProductid(productObjId);
        if (existing == null) {
            existing = new ProductImages();
            existing.setProductid(productObjId);
            existing.setProductimages(uploadedUrls);
        } else {
            existing.getProductimages().addAll(uploadedUrls);
        }

        productImagesRepository.save(existing);
        return uploadedUrls;
    }

    public List<String> getProductImages(ObjectId categoryid, ObjectId subcategoryid, ObjectId productid) {
        ProductImages productImages = productImagesRepository.findByProductid(productid);
        if (productImages != null) {
            return productImages.getProductimages(); // Return the list of image URLs directly
        }
        return List.of(); // Return an empty list if no images found
    }

}
