package com.Looksy.Backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {
    private String id;
    private String userId;
    private List<ProductResponse> products;
    private double amount;
    private String paymentId;
    private String email;
    private LocalDateTime orderTiming;
    private LocalDateTime estimatedDeliveryTiming;
    private String status;  // Use String here
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // getters and setters
    public String getStatus() {
        return status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<ProductResponse> getProducts() {
        return products;
    }

    public void setProducts(List<ProductResponse> products) {
        this.products = products;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getOrderTiming() {
        return orderTiming;
    }

    public void setOrderTiming(LocalDateTime orderTiming) {
        this.orderTiming = orderTiming;
    }

    public LocalDateTime getEstimatedDeliveryTiming() {
        return estimatedDeliveryTiming;
    }

    public void setEstimatedDeliveryTiming(LocalDateTime estimatedDeliveryTiming) {
        this.estimatedDeliveryTiming = estimatedDeliveryTiming;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public static class ProductResponse {
        private String productId;
        private String productName;
        private int quantity;
        private double price;

        // Getters and setters

        public String getProductId() { return productId; }
        public void setProductId(String productId) { this.productId = productId; }

        public String getProductName() { return productName; }
        public void setProductName(String productName) { this.productName = productName; }

        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }

        public double getPrice() { return price; }
        public void setPrice(double price) { this.price = price; }
    }
}