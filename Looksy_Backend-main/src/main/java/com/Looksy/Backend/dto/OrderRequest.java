package com.Looksy.Backend.dto;

import com.Looksy.Backend.model.OrderStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

import java.util.List;

public class OrderRequest {

    private String userId;
    private List<ProductRequest> products;
    private double amount;
    private String paymentId;
    private String email;
    private OrderStatus status;

    // Getters and setters

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public List<ProductRequest> getProducts() { return products; }
    public void setProducts(List<ProductRequest> products) { this.products = products; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }

    public static class ProductRequest {
        private String productId;
        private int quantity;
        private double price;

        // Getters and setters

        public String getProductId() { return productId; }
        public void setProductId(String productId) { this.productId = productId; }

        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }

        public double getPrice() { return price; }
        public void setPrice(double price) { this.price = price; }
    }
}
