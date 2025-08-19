package com.Looksy.Backend.service;

import com.Looksy.Backend.model.Administrator;
import com.Looksy.Backend.repository.AdminRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class AdminService {
    private static final Logger logger = LoggerFactory.getLogger(AdminService.class);

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private Cloudinary cloudinary;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Check admin login credentials
    public Administrator checkAdminLogin(String email, String password) {
        Administrator admin = adminRepository.findByEmailid(email);

        if (admin == null) {
            logger.warn("No admin found with email: {}", email);
            return null;
        }

        if (passwordEncoder.matches(password, admin.getPassword())) {
            return admin;
        } else {
            logger.warn("Password mismatch for admin email: {}", email);
            return null;
        }
    }

    // Save new admin with encrypted password
    public void saveAdmin(Administrator admin) {
        if (admin.getPassword() != null && !admin.getPassword().isEmpty()) {
            admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        }
        adminRepository.save(admin);
        logger.info("Admin saved successfully: {}", admin.getEmailid());
    }

    // Find admin by email
    public Administrator findByEmail(String email) {
        return adminRepository.findByEmailid(email);
    }

    // Upload image to Cloudinary
    public String uploadImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File must not be empty");
        }

        return (String) cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap()).get("secure_url");
    }
}
