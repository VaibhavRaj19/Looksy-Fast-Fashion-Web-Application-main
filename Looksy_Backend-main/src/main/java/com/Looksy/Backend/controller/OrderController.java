package com.Looksy.Backend.controller;

import com.Looksy.Backend.dto.OrderRequest;
import com.Looksy.Backend.dto.OrderResponse;
import com.Looksy.Backend.exception.ResourceNotFoundException;
import com.Looksy.Backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // POST: Get all orders (though GET would be more appropriate)
    @PostMapping("/all")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        List<OrderResponse> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    // POST: Get order by ID (though GET would be more appropriate)
    @PostMapping("/get/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable String id) {
        Optional<OrderResponse> order = orderService.getOrderById(id);
        return order.map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + id));
    }

    // POST: Create new order
    @PostMapping("/create")
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest request) {
        OrderResponse response = orderService.createOrder(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // POST: Update order by ID
    @PostMapping("/update/{id}")
    public ResponseEntity<OrderResponse> updateOrder(
            @PathVariable String id,
            @RequestBody OrderRequest request) {

        Optional<OrderResponse> updatedOrder = orderService.updateOrder(id, request);
        return updatedOrder.map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + id));
    }

    // POST: Delete order by ID
    @PostMapping("/delete/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        boolean deleted = orderService.deleteOrder(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        throw new ResourceNotFoundException("Order not found with ID: " + id);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByUserId(@PathVariable String userId) {
        List<OrderResponse> orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    // POST: Update order status
    @PostMapping("/update-status/{id}")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable String id,
            @RequestParam String status) {

        Optional<OrderResponse> updatedOrder = orderService.updateOrderStatus(id, status);
        return updatedOrder.map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + id));
    }
}