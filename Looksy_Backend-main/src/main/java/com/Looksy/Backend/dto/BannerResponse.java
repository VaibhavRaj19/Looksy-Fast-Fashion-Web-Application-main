
// BannerResponse.java (DTO)
package com.Looksy.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class BannerResponse {
    private boolean status;
    private List<String> data;
}
