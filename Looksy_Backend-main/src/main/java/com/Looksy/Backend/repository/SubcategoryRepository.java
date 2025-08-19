package com.Looksy.Backend.repository;

import com.Looksy.Backend.model.Subcategory;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SubcategoryRepository extends MongoRepository<Subcategory, String> {
    List<Subcategory> findByBannerpriority(String bannerpriority);
    List<Subcategory> findByCategoryid(ObjectId categoryid);
}
