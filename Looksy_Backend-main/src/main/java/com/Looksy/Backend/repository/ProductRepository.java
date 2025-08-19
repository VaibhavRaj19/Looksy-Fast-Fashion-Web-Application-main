package com.Looksy.Backend.repository;

import com.Looksy.Backend.model.Product;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, ObjectId> {
    List<Product> findBySalestatus(String salestatus);
    List<Product> findByCategoryid(ObjectId categoryid);
    List<Product> findByCategoryidAndSubcategoryid(ObjectId categoryid, ObjectId subcategoryid);
    List<Product> findByStatus(String status);
    List<Product> findByProductnameContainingIgnoreCase(String productname);
    List<Product> findByIdIn(List<ObjectId> ids); // Adjusted to accept ObjectId
}
