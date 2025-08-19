package com.Looksy.Backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateProfileDTO {
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String gender;
    private String newEmail; // Optional: only if email update is needed
}
