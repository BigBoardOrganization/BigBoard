package com.university.bigboardorganization.bigboardapi.exception;

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(String entityName, Long id) {
        super("%s with id %d not found!".formatted(entityName, id));
    }

    public EntityNotFoundException(String entityName, String field, String value) {
        super("%s with %s [%s] not found!".formatted(entityName, field, value));
    }
}
