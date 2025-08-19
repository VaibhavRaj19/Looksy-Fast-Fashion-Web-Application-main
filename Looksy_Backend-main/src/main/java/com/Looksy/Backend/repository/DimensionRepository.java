package com.Looksy.Backend.repository;

import com.Looksy.Backend.model.Dimension;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DimensionRepository extends MongoRepository<Dimension, ObjectId> {
    // Custom query methods can be defined here if needed
    List<Dimension> findByDimension(String dimension); // e.g., "M"

}