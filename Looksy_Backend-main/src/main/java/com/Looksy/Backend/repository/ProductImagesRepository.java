package com.Looksy.Backend.repository;

import com.Looksy.Backend.model.ProductImages;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImagesRepository extends MongoRepository<ProductImages, String> {
    ProductImages findByProductid(ObjectId productid); // Accept ObjectId
}
