package com.Looksy.Backend.repository;
import com.Looksy.Backend.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;


public interface ClientRepository extends MongoRepository<User, String>{
    Optional<User> findByEmail(String email);
}



