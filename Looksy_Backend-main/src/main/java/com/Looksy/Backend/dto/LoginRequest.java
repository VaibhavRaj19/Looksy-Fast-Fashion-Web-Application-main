package com.Looksy.Backend.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {
    @NotBlank(message = "Email address is required")
    private String emailid;

    @NotBlank(message = "Password is required")
    private String password;

    // Getters and Setters
    public String getEmailid() {
        return emailid;
    }

    public void setEmailid(String emailaddress) {
        this.emailid = emailaddress; // ✅ correct assignment
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
