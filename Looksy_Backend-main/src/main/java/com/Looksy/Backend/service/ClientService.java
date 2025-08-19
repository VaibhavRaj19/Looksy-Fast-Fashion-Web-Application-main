package com.Looksy.Backend.service;

import com.Looksy.Backend.dto.TempUserData;
import com.Looksy.Backend.dto.UserDTO;
import com.Looksy.Backend.dto.VerifyOtpDto;
import com.Looksy.Backend.model.User;
import com.Looksy.Backend.repository.ClientRepository;
import com.Looksy.Backend.tempstore.OtpStore;
import com.Looksy.Backend.util.JwtUtil;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ClientService {

    private final Map<String, TempUserData> pendingUsers = new ConcurrentHashMap<>();
    private static final long OTP_EXPIRY_MINUTES = 3;


    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String registerUser(UserDTO dto) {
        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            return "Passwords do not match";
        }

        if (clientRepository.findByEmail(dto.getEmail()).isPresent()) {
            return "Email already registered";
        }

        // Check if already in pending users (prevent spam)
        if (pendingUsers.containsKey(dto.getEmail())) {
            return "OTP already sent. Please verify or wait before resending.";
        }

        String otp = generateOTP();
        TempUserData tempData = new TempUserData();
        tempData.setUserDTO(dto);
        tempData.setOtp(otp);
        tempData.setOtpGeneratedTime(LocalDateTime.now());

        pendingUsers.put(dto.getEmail(), tempData);

        try {
            emailService.sendOtpEmail(dto.getEmail(), otp);
        } catch (MessagingException e) {
            pendingUsers.remove(dto.getEmail());
            return "Failed to send OTP email";
        }

        return "OTP sent to email";
    }


    public String verifyOtp(VerifyOtpDto dto) {
        TempUserData tempData = pendingUsers.get(dto.getEmail());

        if (tempData == null) {
            return "No OTP request found for this email or OTP expired";
        }

        // Check if OTP is expired
        if (tempData.getOtpGeneratedTime().plusMinutes(OTP_EXPIRY_MINUTES).isBefore(LocalDateTime.now())) {
            pendingUsers.remove(dto.getEmail());
            return "OTP expired. Please request a new OTP.";
        }

        // Check if OTP matches
        if (!tempData.getOtp().equals(dto.getOtp())) {
            return "Invalid OTP.";
        }

        // Prevent OTP reuse: remove immediately after successful verification
        pendingUsers.remove(dto.getEmail());

        // Proceed with saving user
        UserDTO dtoData = tempData.getUserDTO();

        User user = new User();
        user.setEmail(dtoData.getEmail());
        user.setFirstName(dtoData.getFirstName());
        user.setLastName(dtoData.getLastName());
        user.setDob(dtoData.getDob());
        user.setGender(dtoData.getGender());
        user.setPassword(passwordEncoder.encode(dtoData.getPassword()));
        user.setVerified(true);

        clientRepository.save(user);

        return "User verified and registered successfully.";
    }



    public String resendOtp(String email) {
        TempUserData tempData = pendingUsers.get(email);  // Cache or DB-based temp storage

        if (tempData == null) {
            return "No registration attempt found. Please register first.";
        }

        // Generate and update a new OTP
        String newOtp = generateOTP();
        tempData.setOtp(newOtp);
        tempData.setOtpGeneratedTime(LocalDateTime.now());

        try {
            emailService.sendOtpEmail(email, newOtp);
        } catch (MessagingException e) {
            return "Failed to resend OTP";
        }

        return "OTP resent successfully";
    }

    public String login(String email, String password) {
        Optional<User> optionalUser = clientRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return "Invalid credentials";
        }

        User user = optionalUser.get();

        if (!user.isVerified()) {
            return "User not verified";
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return "Invalid credentials";
        }

        return jwtUtil.generateToken(user.getEmail());
    }


    public String requestEmailChangeOtp(String email, String newEmail) {
        if (!clientRepository.findByEmail(email).isPresent()) {
            return "Current user not found";
        }

        if (clientRepository.findByEmail(newEmail).isPresent()) {
            return "New email is already registered";
        }

        String otp = generateOTP();
        OtpStore.storeOtp(newEmail, otp);

        try {
            emailService.sendOtpEmail(newEmail, otp);
        } catch (MessagingException e) {
            OtpStore.removeOtp(newEmail);
            return "Failed to send OTP to new email";
        }

        return "OTP sent to new email";
    }

    public String verifyEmailChangeOtpAndUpdate(String email, String newEmail, String otp) {
        if (!OtpStore.verifyOtp(newEmail, otp)) {
            return "Invalid or expired OTP";
        }

        Optional<User> optionalUser = clientRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        User user = optionalUser.get();
        user.setEmail(newEmail);
        clientRepository.save(user);

        OtpStore.removeOtp(newEmail);
        return "Email updated successfully";
    }

    public String updateUserProfile(String email, UserDTO updatedData) {
        Optional<User> optionalUser = clientRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        User user = optionalUser.get();
        user.setFirstName(updatedData.getFirstName());
        user.setLastName(updatedData.getLastName());
        user.setDob(updatedData.getDob());
        user.setGender(updatedData.getGender());

        clientRepository.save(user);
        return "Profile updated successfully";
    }


    public Optional<User> getUserByEmail(String email) {
        return clientRepository.findByEmail(email);
    }
    private String generateOTP() {
        return String.valueOf(new Random().nextInt(900000) + 100000);
    }
}
