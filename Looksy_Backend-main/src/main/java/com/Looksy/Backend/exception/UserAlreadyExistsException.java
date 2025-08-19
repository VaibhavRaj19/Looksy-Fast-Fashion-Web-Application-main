package com.Looksy.Backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// @ResponseStatus can be used to automatically map this exception to an HTTP status code
@ResponseStatus(HttpStatus.CONFLICT) // Or HttpStatus.BAD_REQUEST, depending on your preference
public class UserAlreadyExistsException extends RuntimeException {

    public UserAlreadyExistsException(String message) {
        super(message);
    }

    public UserAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}