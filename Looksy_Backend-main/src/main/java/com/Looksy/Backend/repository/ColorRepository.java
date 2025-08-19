package com.Looksy.Backend.repository;

import com.Looksy.Backend.model.Color;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorRepository extends MongoRepository<Color, String> {

    List<Color> findByProductid(ObjectId productid);

}
