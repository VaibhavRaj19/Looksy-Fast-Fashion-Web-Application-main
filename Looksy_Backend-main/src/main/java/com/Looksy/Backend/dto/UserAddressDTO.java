package com.Looksy.Backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserAddressDTO {

    private String addressid; // Optional for update/delete

    @JsonProperty("email")
    @NotBlank(message = "EmailId is required")
    private  String email;

    @NotBlank(message = "User ID is required")
    private String userid; // String because from client side it is easier to pass

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

    @NotBlank(message = "Country is required")
    private String country;
}
