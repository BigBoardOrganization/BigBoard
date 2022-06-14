package com.university.bigboardorganization.bigboardapi.exception;

public class EntityDuplicatesException extends RuntimeException {

    public EntityDuplicatesException(String entityName, String field, String value) {
        super("%s with %s [%s] already exist!".formatted(entityName, field, value));
    }
}
