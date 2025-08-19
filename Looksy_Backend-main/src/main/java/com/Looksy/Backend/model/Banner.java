// Banner.java (Model)
package com.Looksy.Backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "banners")
public class Banner {
    @Id
    private String id;
    private List<String> bannerPictures;
}
