package com.Looksy.Backend.repository;

import com.Looksy.Backend.model.UserAddress;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.bson.types.ObjectId;
import java.util.List;

public interface UserAddressRepository extends MongoRepository<UserAddress, String> {
    List<UserAddress> findByUserid(ObjectId userid);
    List<UserAddress> findByEmail(String email);
}
