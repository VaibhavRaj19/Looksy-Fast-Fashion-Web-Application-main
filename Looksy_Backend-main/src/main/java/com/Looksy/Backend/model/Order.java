package com.Looksy.Backend.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.bson.types.ObjectId;
import java.time.LocalDateTime;
import java.util.List;
import java.util.List;

@Document(collection = "ordersDetails")
public class Order {

    @Id
    private ObjectId orderid;
    private ObjectId userId;
    private List<Product> products;
    private double amount;
    private String paymentId;
    private String email;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime orderTiming = LocalDateTime.now();

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime estimatedDeliveryTiming = LocalDateTime.now().plusDays(7);

    private OrderStatus status = OrderStatus.PENDING;

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public ObjectId getOrderid() {
        return orderid;
    }

    public void setOrderid(ObjectId orderid) {
        this.orderid = orderid;
    }

    public ObjectId getUserId() {
        return userId;
    }

    public void setUserId(ObjectId userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
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

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public static class Product {
        private ObjectId productId;
        private String productName;
        private int quantity;
        private double price;

        // Getters and setters
        public ObjectId getProductId() {
            return productId;
        }

        public void setProductId(ObjectId productId) {
            this.productId = productId;
        }

        public String getProductName() {
            return productName;
        }

        public void setProductName(String productName) {
            this.productName = productName;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }
    }

    public Order() {}


}
