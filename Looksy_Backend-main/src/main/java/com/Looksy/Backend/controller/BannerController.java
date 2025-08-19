package com.Looksy.Backend.controller;

import com.Looksy.Backend.service.BannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/banners")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor
public class BannerController {

    private final BannerService bannerService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadBanners(@RequestParam("pictures") MultipartFile[] files) throws IOException {
        return bannerService.uploadBanners(files);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllBanners() {
        return bannerService.getAllBanners();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBanner(@PathVariable String id) {
        return bannerService.deleteBanner(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBanner(@PathVariable String id, @RequestParam("pictures") MultipartFile[] files) throws IOException {
        return bannerService.updateBanner(id, files);
    }
}
