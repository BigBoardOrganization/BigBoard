package com.university.bigboardorganization.bigboardapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.security.auth.login.LoginException;

@ControllerAdvice
public class ExceptionHandleController {

    @ExceptionHandler(value = EntityNotFoundException.class)
    public ResponseEntity<Object> entityNotFoundException(EntityNotFoundException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = EntityDuplicatesException.class)
    public ResponseEntity<Object> entityDuplicatesException(EntityDuplicatesException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = LoginException.class)
    public ResponseEntity<Object> loginException(LoginException loginException) {
        return new ResponseEntity<>(loginException.getMessage(), HttpStatus.FORBIDDEN);
    }
}
