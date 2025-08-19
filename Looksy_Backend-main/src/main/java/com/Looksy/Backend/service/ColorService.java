package com.Looksy.Backend.service;

import com.Looksy.Backend.dto.ColorDTO;
import com.Looksy.Backend.model.Color;
import com.Looksy.Backend.repository.ColorRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorService {

    @Autowired
    private ColorRepository colorRepository;

    public Color addColor(ColorDTO colorDTO) {
        Color color = new Color();
        color.setColorid(ObjectId.get());
        color.setCategoryid(colorDTO.getCategoryid());
        color.setSubcategoryid(colorDTO.getSubcategoryid());
        color.setProductid(colorDTO.getProductid());
        color.setSizeid(colorDTO.getSizeid());
        color.setSize(colorDTO.getSize());
        color.setColor(colorDTO.getColor());
        color.setColorCode(colorDTO.getColorCode()); // ✅ Fix here
        return colorRepository.save(color);
    }

    public List<Color> getAllColors() {
        return colorRepository.findAll();
    }

    public Color updateColor(ColorDTO colorDTO) {
        Color color = colorRepository.findById(colorDTO.getColorid().toHexString()).orElse(null);
        if (color != null) {
            color.setCategoryid(colorDTO.getCategoryid());
            color.setSubcategoryid(colorDTO.getSubcategoryid());
            color.setProductid(colorDTO.getProductid());
            color.setSize(colorDTO.getSize());
            color.setColor(colorDTO.getColor());
            color.setColorCode(colorDTO.getColorCode());
            return colorRepository.save(color);
        }
        return null;
    }

    public void deleteColor(ObjectId colorid) {
        if (colorRepository.existsById(colorid.toHexString())) {
            colorRepository.deleteById(colorid.toHexString());
        } else {
            throw new IllegalArgumentException("Color ID not found: " + colorid);
        }
    }

    public List<Color> getColorsByProductId(String productId) {
        ObjectId objectId = new ObjectId(productId);
        return colorRepository.findByProductid(objectId);
    }

}
