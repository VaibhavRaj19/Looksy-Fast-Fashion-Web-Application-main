package com.Looksy.Backend.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;


import java.time.LocalDate;

@Data
@Document(collection = "userDB")
public class User {

    @Id
    private String userid;

    @NotBlank(message = "Email is required")
    @Indexed(unique = true)
    @Email(message = "Email format is invalid")
    private String email;

    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String gender;

    @NotBlank(message = "Password is required")
    private String password;

//    @Transient
//    @NotBlank(message = "Confirm Password is required")
//    private String confirmPassword;

    private String otp;
    private LocalDateTime otpGeneratedTime;
    private boolean isVerified = false; // set to true only after OTP verification
}
