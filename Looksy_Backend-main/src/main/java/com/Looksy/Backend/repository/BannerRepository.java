// BannerRepository.java (Repository)
package com.Looksy.Backend.repository;

import com.Looksy.Backend.model.Banner;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BannerRepository extends MongoRepository<Banner, String> {
}