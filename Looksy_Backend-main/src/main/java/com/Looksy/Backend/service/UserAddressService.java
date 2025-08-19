package com.Looksy.Backend.service;

import com.Looksy.Backend.dto.UserAddressDTO;
import com.Looksy.Backend.model.UserAddress;
import com.Looksy.Backend.repository.ClientRepository;
import com.Looksy.Backend.repository.UserAddressRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserAddressService {

    @Autowired
    private UserAddressRepository addressRepository;

    @Autowired
    private ClientRepository clientRepository;  // <-- Inject User repository


    public UserAddress addAddress(UserAddressDTO dto) {

        String userIdStr = dto.getUserid();

        if (!clientRepository.existsById(userIdStr)) {
            throw new IllegalArgumentException("User ID does not exist");
        }

        UserAddress address = new UserAddress();
        address.setUserid(new ObjectId(dto.getUserid()));
        address.setEmail(dto.getEmail());
        address.setStreet(dto.getStreet());
        address.setTown(dto.getTown());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setPinCode(dto.getPinCode());
        address.setCountry(dto.getCountry());

        return addressRepository.save(address);
    }


    public Optional<UserAddress> updateAddress(UserAddressDTO dto) {
        if (dto.getAddressid() == null || dto.getAddressid().isEmpty()) {
            return Optional.empty();
        }

        Optional<UserAddress> existingOpt = addressRepository.findById(dto.getAddressid());
        if (existingOpt.isEmpty()) {
            return Optional.empty();
        }

        UserAddress existing = existingOpt.get();

        // Check user ownership - optional, can be done here or in controller
        if (!existing.getUserid().toHexString().equals(dto.getUserid())) {
            return Optional.empty();
        }

        existing.setStreet(dto.getStreet());
        existing.setTown(dto.getTown());
        existing.setCity(dto.getCity());
        existing.setState(dto.getState());
        existing.setPinCode(dto.getPinCode());
        existing.setCountry(dto.getCountry());

        return Optional.of(addressRepository.save(existing));
    }

    public boolean deleteAddress(String addressId) {
        if (!addressRepository.existsById(addressId)) {
            return false;
        }
        addressRepository.deleteById(addressId);
        return true;
    }

    public List<UserAddress> getAllAddressesByUserId(String userid) {
        return addressRepository.findByUserid(new ObjectId(userid));
    }

    public List<UserAddress> getAllAddressesByEmail(String email) {
        return addressRepository.findByEmail(email);
    }

    public Optional<UserAddress> getAddressById(String addressid) {
        return addressRepository.findById(addressid);
    }
}
