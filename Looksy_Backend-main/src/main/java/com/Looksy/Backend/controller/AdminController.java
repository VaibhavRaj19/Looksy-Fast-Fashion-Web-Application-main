// AdminController.java
package com.Looksy.Backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.Looksy.Backend.dto.LoginRequest;
import com.Looksy.Backend.dto.RegisterRequest;
import com.Looksy.Backend.model.Administrator;
import com.Looksy.Backend.service.AdminService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration; // milliseconds

    @Autowired
    private Cloudinary cloudinary;

    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody RegisterRequest registerRequest) {
        if (adminService.findByEmail(registerRequest.getEmailid()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("status", false, "message", "Email already exists"));
        }

        Administrator newAdmin = new Administrator();
        newAdmin.setEmailid(registerRequest.getEmailid());
        newAdmin.setMobileno(registerRequest.getMobileno());
        newAdmin.setAdminname(registerRequest.getAdminname());
        newAdmin.setPassword(registerRequest.getPassword());
        newAdmin.setPicture("default-profile.jpg"); // Set a default image

        adminService.saveAdmin(newAdmin);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("status", true, "message", "Admin registered successfully"));
    }

    @PostMapping("/check_admin_login")
    public ResponseEntity<?> checkAdminLogin(@Valid @RequestBody LoginRequest request) {
        String email = request.getEmailid();
        String password = request.getPassword();

        if (email == null || email.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("status", false, "message", "Email and password are required"));
        }

        email = email.trim();

        Administrator admin = adminService.checkAdminLogin(email, password);

        if (admin != null) {
            String token = Jwts.builder()
                    .setSubject(admin.getEmailid())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                    .signWith(SignatureAlgorithm.HS512, jwtSecret)
                    .compact();

            Map<String, Object> response = new HashMap<>();
            response.put("status", true);
            response.put("admin", admin);
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("status", false, "message", "Invalid credentials"));
        }
    }

    @PostMapping("/upload_picture")
    public ResponseEntity<?> uploadPicture(@RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = adminService.uploadImage(file);
            return ResponseEntity.ok(Map.of("url", imageUrl));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Image upload failed"));
        }
    }

    @GetMapping("/isUserAuth")
    public ResponseEntity<?> isUserAuth(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok(Map.of(
                    "auth", true,
                    "message", "Authenticated",
                    "email", authentication.getName()
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("auth", false, "message", "Not authenticated"));
        }
    }

    @GetMapping("/cleartoken")
    public ResponseEntity<?> clearToken() {
        return ResponseEntity.ok(Map.of("message", "Client-side token clearance needed", "auth", false));
    }
}