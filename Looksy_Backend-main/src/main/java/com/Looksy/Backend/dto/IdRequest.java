package com.Looksy.Backend.dto;

public class IdRequest {
    private String id;

    public IdRequest() {}

    public IdRequest(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
