package com.Looksy.Backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "UserAddress")
public class UserAddress {
    @Id
    @JsonProperty("addressid")
    private String addressid;

    private String email;

    private ObjectId userid;

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
