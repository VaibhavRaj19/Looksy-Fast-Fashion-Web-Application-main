package com.Looksy.Backend.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "subcategory")
public class Subcategory {
    @Id
    private String subcategoryid;

    private ObjectId categoryid; // Stored as ObjectId in DB

    private String subcategoryname;
    private String subcategoryicon;
    private String bannerpriority;
}
