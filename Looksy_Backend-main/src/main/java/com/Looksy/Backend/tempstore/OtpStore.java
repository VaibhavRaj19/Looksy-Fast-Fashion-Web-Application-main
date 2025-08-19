package com.Looksy.Backend.tempstore;

import java.util.HashMap;
import java.util.Map;

public class OtpStore {
    private static final Map<String, String> otpMap = new HashMap<>();

    public static void storeOtp(String email, String otp) {
        otpMap.put(email, otp);
    }

    public static boolean verifyOtp(String email, String otp) {
        return otpMap.containsKey(email) && otpMap.get(email).equals(otp);
    }

    public static void removeOtp(String email) {
        otpMap.remove(email);
    }
}
