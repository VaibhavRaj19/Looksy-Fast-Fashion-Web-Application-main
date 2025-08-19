package com.Looksy.Backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.Looksy.Backend.dto.BannerResponse;
import com.Looksy.Backend.model.Banner;
import com.Looksy.Backend.repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;
    private final Cloudinary cloudinary;

    public ResponseEntity<?> uploadBanners(MultipartFile[] files) throws IOException {
        if (files.length == 0) {
            return ResponseEntity.badRequest().body(Map.of("status", false, "message", "No files uploaded"));
        }

        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            imageUrls.add((String) result.get("secure_url"));
        }

        Banner banner = new Banner();
        banner.setBannerPictures(imageUrls);
        bannerRepository.save(banner);

        return ResponseEntity.ok(Map.of("status", true, "message", "Banners uploaded successfully", "data", banner));
    }

    public ResponseEntity<?> getAllBanners() {
        List<Banner> banners = bannerRepository.findAll();
        List<String> allImages = new ArrayList<>();
        for (Banner banner : banners) {
            allImages.addAll(banner.getBannerPictures());
        }
        return ResponseEntity.ok(new BannerResponse(true, allImages));
    }

    public ResponseEntity<?> deleteBanner(String id) {
        if (!bannerRepository.existsById(id)) {
            return ResponseEntity.status(404).body(Map.of("status", false, "message", "Banner not found"));
        }
        bannerRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("status", true, "message", "Banner deleted successfully"));
    }

    public ResponseEntity<?> updateBanner(String id, MultipartFile[] files) throws IOException {
        Banner banner = bannerRepository.findById(id).orElse(null);
        if (banner == null) {
            return ResponseEntity.status(404).body(Map.of("status", false, "message", "Banner not found"));
        }

        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            imageUrls.add((String) result.get("secure_url"));
        }
        banner.setBannerPictures(imageUrls);
        bannerRepository.save(banner);

        return ResponseEntity.ok(Map.of("status", true, "message", "Banner updated successfully", "data", banner));
    }
}
