package com.Looksy.Backend.controller;

import com.Looksy.Backend.dto.DimensionDTO;
import com.Looksy.Backend.model.Dimension;
import com.Looksy.Backend.service.DimensionService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dimensions")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class DimensionController {
    private final DimensionService dimensionService;

    @Autowired
    public DimensionController(DimensionService dimensionService) {
        this.dimensionService = dimensionService;
    }

    // Helper method to convert Dimension to DimensionDTO
    private DimensionDTO convertToDTO(Dimension dimension) {
        DimensionDTO dto = new DimensionDTO();
        dto.setDimensionid(dimension.getDimensionid());
        dto.setCategoryid(dimension.getCategoryid());
        dto.setSubcategoryid(dimension.getSubcategoryid());
        dto.setProductid(dimension.getProductid());
        dto.setDimension(dimension.getDimension());
        return dto;
    }

    // Helper method to convert DimensionDTO to Dimension
    private Dimension convertToEntity(DimensionDTO dto) {
        Dimension dimension = new Dimension(dto.getCategoryid(), dto.getSubcategoryid(), dto.getProductid(), dto.getDimension());
        // Set id only if present
        if (dto.getDimensionid() != null) {
            dimension.setDimensionid(dto.getDimensionid());
        }
        return dimension;
    }



    @PostMapping("/add_new_dimension")
    public ResponseEntity<Map<String, Object>> addNewDimension(@RequestBody DimensionDTO dimensionDTO) {
        try {
            // Validation
            if (dimensionDTO.getCategoryid() == null || dimensionDTO.getSubcategoryid() == null ||
                    dimensionDTO.getProductid() == null) {
                return ResponseEntity.status(400).body(Map.of(
                        "status", false,
                        "error", "Category ID, Subcategory ID, and Product ID are required"
                ));
            }

            if (dimensionDTO.getDimension() == null || dimensionDTO.getDimension().isEmpty()) {
                return ResponseEntity.status(400).body(Map.of(
                        "status", false,
                        "error", "At least one dimension is required"
                ));
            }

            Dimension dimension = convertToEntity(dimensionDTO);
            Dimension newDimension = dimensionService.addNewDimension(dimension);
            DimensionDTO responseDTO = convertToDTO(newDimension);

            return ResponseEntity.ok(Map.of(
                    "status", true,
                    "message", "Dimension added successfully",
                    "data", responseDTO
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "status", false,
                    "error", e.getMessage()
            ));
        }
    }



    @GetMapping("/display_all_dimensions")
    public ResponseEntity<List<DimensionDTO>> displayAllDimensions() {
        List<Dimension> dimensions = dimensionService.displayAllDimensions();

        List<DimensionDTO> dtoList = dimensions.stream().map(dimension -> {
            DimensionDTO dto = new DimensionDTO();
            dto.setDimensionid(dimension.getDimensionid());
            dto.setCategoryid(dimension.getCategoryid());
            dto.setSubcategoryid(dimension.getSubcategoryid());
            dto.setProductid(dimension.getProductid());
            dto.setDimension(dimension.getDimension());
            return dto;
        }).toList();

        return ResponseEntity.ok(dtoList);
    }


    @PostMapping("/edit_dimension_data")
    public ResponseEntity<?> editDimensionData(@RequestBody DimensionDTO dimensionDTO) {
        try {
            if (dimensionDTO.getDimensionid() == null) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Dimension ID is required"
                ));
            }

            Dimension dimension = convertToEntity(dimensionDTO);
            Dimension updatedDimension = dimensionService.editDimensionData(dimension);

            if (updatedDimension == null) {
                return ResponseEntity.status(404).body(Map.of(
                        "success", false,
                        "message", "Dimension not found"
                ));
            }

            return ResponseEntity.ok(convertToDTO(updatedDimension));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "success", false,
                    "message", "Error updating dimension: " + e.getMessage()
            ));
        }
    }


    @DeleteMapping("/delete_dimension_data/{dimensionid}")
    @CrossOrigin(methods = {RequestMethod.DELETE}, origins = "http://localhost:3000")
    public ResponseEntity<?> deleteDimensionData(@PathVariable String dimensionid) {
        try {
            if (!ObjectId.isValid(dimensionid)) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Invalid ObjectId format"
                ));
            }

            ObjectId objectId = new ObjectId(dimensionid);
            Dimension deletedDimension = dimensionService.deleteDimensionData(objectId);

            if (deletedDimension != null) {
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "message", "Dimension deleted successfully"
                ));
            } else {
                return ResponseEntity.status(404).body(Map.of(
                        "success", false,
                        "message", "Dimension not found"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "success", false,
                    "message", "Error deleting dimension"
            ));
        }
    }

    @PostMapping("/fetch_all_dimensions")
    public ResponseEntity<List<DimensionDTO>> fetchAllDimensions(@RequestBody DimensionDTO dimensionDTO) {
        List<Dimension> dimensions = dimensionService.fetchAllDimensions(
                dimensionDTO.getCategoryid(),
                dimensionDTO.getSubcategoryid(),
                dimensionDTO.getProductid()
        );
        List<DimensionDTO> dimensionDTOs = dimensions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dimensionDTOs);
    }
}
