package com.Looksy.Backend.repository;

import com.Looksy.Backend.model.Administrator;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends MongoRepository<Administrator, String> {
    // Find administrator by exact email match
    Administrator findByEmailid(String emailid);

    // Find administrator with case-insensitive email match
    @Query("{ 'emailid': { $regex: ?0, $options: 'i' } }")
    Administrator findByEmailidIgnoreCase(String emailid);
}