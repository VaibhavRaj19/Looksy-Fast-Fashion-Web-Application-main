package com.Looksy.Backend.controller;

import com.Looksy.Backend.dto.UserAddressDTO;
import com.Looksy.Backend.model.UserAddress;
import com.Looksy.Backend.service.UserAddressService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/address")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserAddressController {

    @Autowired
    private UserAddressService addressService;

    @PostMapping("/add_address")
    public ResponseEntity<?> addAddress(@Valid @RequestBody UserAddressDTO dto) {
        UserAddress saved = addressService.addAddress(dto);
        if (saved != null) {
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Address added successfully",
                    "addressid", saved.getAddressid(),
                    "data", saved
            ));
        } else {
            return ResponseEntity.status(500).body(Map.of(
                    "success", false,
                    "message", "Failed to add address"
            ));
        }
    }



    @PostMapping("/update_address")
    public ResponseEntity<?> updateAddress(@Valid @RequestBody UserAddressDTO dto) {
        if (dto.getAddressid() == null || dto.getAddressid().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Address ID is required for update"
            ));
        }

        Optional<UserAddress> updated = addressService.updateAddress(dto);
        if (updated.isEmpty()) {
            return ResponseEntity.status(403).body(Map.of(
                    "success", false,
                    "message", "Address not found or unauthorized"
            ));
        }

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Address updated successfully",
                "addressid", updated.get().getAddressid(),
                "data", updated.get()
        ));
    }

    @PostMapping("/delete_address")
    public ResponseEntity<?> deleteAddress(@RequestBody Map<String, String> body) {
        String addressid = body.get("addressid");
        if (addressid == null || addressid.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Address ID is required for delete"
            ));
        }

        boolean deleted = addressService.deleteAddress(addressid);
        if (!deleted) {
            return ResponseEntity.status(404).body(Map.of(
                    "success", false,
                    "message", "Address not found"
            ));
        }
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Address deleted successfully"
        ));
    }



    @GetMapping("/display_all/{userid}")
    public ResponseEntity<List<UserAddress>> displayAll(@PathVariable String userid) {
        List<UserAddress> addresses = addressService.getAllAddressesByUserId(userid);
        return ResponseEntity.ok(addresses);
    }

    @GetMapping("/display_email/{email}")
    public ResponseEntity<List<Map<String, Object>>> displayAllByEmail(@PathVariable String email) {
        List<UserAddress> addresses = addressService.getAllAddressesByEmail(email);
        // Map UserAddress to Map to see keys explicitly
        List<Map<String, Object>> mapped = addresses.stream().map(addr -> {
            Map<String, Object> m = new HashMap<>();
            m.put("addressid", addr.getAddressid());
            m.put("email", addr.getEmail());
            m.put("street", addr.getStreet());
            m.put("town", addr.getTown());
            m.put("city", addr.getCity());
            m.put("state", addr.getState());
            m.put("pinCode", addr.getPinCode());
            m.put("country", addr.getCountry());
            return m;
        }).collect(Collectors.toList());

        System.out.println("Mapped addresses: " + mapped);
        return ResponseEntity.ok(mapped);
    }


    @GetMapping("/display_by_address_id/{addressid}")
    public ResponseEntity<?> displayByAddressId(@PathVariable String addressid) {
        Optional<UserAddress> address = addressService.getAddressById(addressid);
        if (address.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(address.get());
    }
}
