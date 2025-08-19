package com.Looksy.Backend.exception;

public class SmsServiceException extends RuntimeException {
    public SmsServiceException(String message) {
        super(message);
    }
}
