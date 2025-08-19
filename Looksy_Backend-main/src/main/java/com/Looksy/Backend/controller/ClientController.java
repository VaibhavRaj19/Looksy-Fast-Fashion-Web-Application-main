package com.Looksy.Backend.controller;

import com.Looksy.Backend.dto.UserDTO;
import com.Looksy.Backend.dto.VerifyOtpDto;
import com.Looksy.Backend.model.User;
import com.Looksy.Backend.service.ClientService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/user")
public class ClientController {

    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String result = clientService.resendOtp(email);
        return ResponseEntity.ok(Map.of("message", result));
    }


    @PostMapping("/request-email-change-otp")
    public ResponseEntity<?> requestEmailChangeOtp(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String newEmail = data.get("newEmail");
        String result = clientService.requestEmailChangeOtp(email, newEmail);
        return ResponseEntity.ok(Map.of("message", result));
    }

    @PostMapping("/verify-email-change")
    public ResponseEntity<?> verifyEmailChange(@RequestBody Map<String, String> data) {
        String currentEmail = data.get("currentEmail");
        String newEmail = data.get("newEmail");
        String otp = data.get("otp");

        String result = clientService.verifyEmailChangeOtpAndUpdate(currentEmail, newEmail, otp);
        return ResponseEntity.ok(Map.of("message", result));
    }

    @PostMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestParam String email, @RequestBody UserDTO updatedData) {
        String result = clientService.updateUserProfile(email, updatedData);
        return ResponseEntity.ok(Map.of("message", result));
    }




    @Autowired private ClientService clientService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDTO userDTO) throws MessagingException{
        String result = clientService.registerUser(userDTO);
        return ResponseEntity.ok(Map.of("message", result));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpDto verifyOtpDto) {
        String result = clientService.verifyOtp(verifyOtpDto);

        if (result.equals("OTP expired. Please request a new OTP.")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", result));
        }

        return ResponseEntity.ok(Map.of("message", result));
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
        String token = clientService.login(email, password);

        if (token.equals("Invalid credentials") || token.equals("User not verified")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", token));
        }

        // Successful login: return 200 OK with token
        return ResponseEntity.ok(Map.of("token", token));
    }


    @GetMapping("/get-by/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        return clientService.getUserByEmail(email)
                .map(user -> ResponseEntity.ok(user))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body((User) Map.of("error", "User not found")));
    }


}
