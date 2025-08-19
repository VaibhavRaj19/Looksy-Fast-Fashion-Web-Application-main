package com.Looksy.Backend.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<com.Looksy.Backend.model.Order, ObjectId> {
    List<com.Looksy.Backend.model.Order> findByUserId(ObjectId userId);
}
