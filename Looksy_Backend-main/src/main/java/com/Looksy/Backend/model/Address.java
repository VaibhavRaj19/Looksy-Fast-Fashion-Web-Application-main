package com.Looksy.Backend.model;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.bson.types.ObjectId;

@Data
public class Address {

    private String id = new ObjectId().toHexString();

    @NotBlank(message = "Street is required")
    private String street;

    @NotBlank(message = "Town is required")
    private String town;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Pincode is required")
    private String pinCode;

    private String country;
}
