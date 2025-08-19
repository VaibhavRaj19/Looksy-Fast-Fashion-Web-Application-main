package com.Looksy.Backend.controller;

import com.Looksy.Backend.dto.ColorDTO;
import com.Looksy.Backend.model.Color;
import com.Looksy.Backend.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/colors")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ColorController {

    @Autowired
    private ColorService colorService;

    @PostMapping("/add_new_color")
    public ResponseEntity<Color> addNewColor(@RequestBody ColorDTO colorDTO) {
        Color color = colorService.addColor(colorDTO);
        return ResponseEntity.ok(color);
    }


    @GetMapping("/product-by-id")
    public ResponseEntity<List<Color>> getColorsByProductId(@RequestParam("productId") String productId) {
        if (productId == null || productId.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        List<Color> colors = colorService.getColorsByProductId(productId);
        return ResponseEntity.ok(colors);
    }


    @GetMapping("/display_all_color")
    public ResponseEntity<List<Color>> displayAllColor() {
        List<Color> colors = colorService.getAllColors();
        return ResponseEntity.ok(colors);
    }

    @PostMapping("/edit_color_data")
    public ResponseEntity<Color> editColorData(@RequestBody ColorDTO colorDTO) {
        Color updatedColor = colorService.updateColor(colorDTO);
        if (updatedColor != null) {
            return ResponseEntity.ok(updatedColor);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/delete_color_data")
    public ResponseEntity<Map<String, Object>> deleteColorData(@RequestBody ColorDTO colorDTO) {
        try {
            colorService.deleteColor(colorDTO.getColorid());
            Map<String, Object> response = new HashMap<>();
            response.put("status", true);
            response.put("message", "Color deleted successfully");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

}
