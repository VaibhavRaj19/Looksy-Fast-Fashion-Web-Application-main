package com.Looksy.Backend.service;

import com.Looksy.Backend.model.Dimension;
import com.Looksy.Backend.repository.DimensionRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DimensionService {
    private final DimensionRepository dimensionRepository;

    @Autowired
    public DimensionService(DimensionRepository dimensionRepository) {
        this.dimensionRepository = dimensionRepository;
    }

    public Dimension addNewDimension(Dimension dimension) {
        return dimensionRepository.save(dimension);
    }

    public List<Dimension> displayAllDimensions() {
        return dimensionRepository.findAll();
    }

    public Dimension editDimensionData(Dimension dimension) {
        return dimensionRepository.save(dimension);
    }

    public Dimension deleteDimensionData(ObjectId dimensionid) {
        Optional<Dimension> dimensionOptional = dimensionRepository.findById(dimensionid);
        if (dimensionOptional.isPresent()) {
            Dimension dimension = dimensionOptional.get();
            dimensionRepository.delete(dimension);
            return dimension; // Return the deleted dimension
        } else {
            return null; // Return null if not found
        }
    }

    public List<Dimension> fetchAllDimensions(ObjectId categoryid, ObjectId subcategoryid, ObjectId productid) {
        return dimensionRepository.findAll(); // Implement filtering logic as needed
    }

}
