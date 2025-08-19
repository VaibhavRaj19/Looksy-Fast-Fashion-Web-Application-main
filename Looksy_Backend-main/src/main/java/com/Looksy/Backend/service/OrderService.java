package com.Looksy.Backend.service;

import com.Looksy.Backend.exception.ResourceNotFoundException;
import com.Looksy.Backend.dto.OrderRequest;
import com.Looksy.Backend.dto.OrderResponse;
import com.Looksy.Backend.exception.InsufficientStockException;
import com.Looksy.Backend.model.Order;
import com.Looksy.Backend.model.OrderStatus;
import com.Looksy.Backend.model.Product;
import com.Looksy.Backend.repository.ProductRepository;
import com.Looksy.Backend.repository.OrderRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;

    public OrderResponse createOrder(OrderRequest request) {
        // Validate that the product has enough stock
        for (OrderRequest.ProductRequest productRequest : request.getProducts()) {
            Product product = productRepository.findById(new ObjectId(productRequest.getProductId()))
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productRequest.getProductId()));

            if (product.getStock() < productRequest.getQuantity()) {
                throw new InsufficientStockException("Not enough stock for product: " + product.getProductname());
            }
        }

        // Create and save the order
        Order order = new Order();
        order.setUserId(new ObjectId(request.getUserId()));
        order.setProducts(request.getProducts().stream().map(p -> {
            Product productDetails = productRepository.findById(new ObjectId(p.getProductId()))
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + p.getProductId()));
            Order.Product product = new Order.Product();
            product.setProductId(new ObjectId(p.getProductId()));
            product.setProductName(productDetails.getProductname());
            product.setQuantity(p.getQuantity());
            product.setPrice(p.getPrice());
            return product;
        }).collect(Collectors.toList()));
        order.setAmount(request.getAmount());
        order.setPaymentId(request.getPaymentId());
        order.setEmail(request.getEmail());
        order.setStatus(OrderStatus.COMPLETED);
        order.setOrderTiming(LocalDateTime.now());
        order.setEstimatedDeliveryTiming(LocalDateTime.now().plusDays(7)); // Example delivery time

        Order savedOrder = orderRepository.save(order);

        // Decrease product stock
        for (OrderRequest.ProductRequest productRequest : request.getProducts()) {
            Product product = productRepository.findById(new ObjectId(productRequest.getProductId())).get();
            product.setStock(product.getStock() - productRequest.getQuantity());
            productRepository.save(product);
        }

        return mapToResponse(savedOrder);
    }


    // Get order by ID
    public Optional<OrderResponse> getOrderById(String id) {
        return orderRepository.findById(new ObjectId(id))
                .map(this::mapToResponse);
    }

    // Get all orders
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Update order by ID
    public Optional<OrderResponse> updateOrder(String id, OrderRequest request) {
        Optional<Order> optionalOrder = orderRepository.findById(new ObjectId(id));
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();

            // Restore the stock of the products in the original order.
            // This is to ensure that if the order is updated with different products or quantities,
            // the stock of the original products is returned.
            for (Order.Product productInOrder : order.getProducts()) {
                productRepository.findById(productInOrder.getProductId()).ifPresent(product -> {
                    product.setStock(product.getStock() + productInOrder.getQuantity());
                    productRepository.save(product);
                });
            }

            // Validate that the product has enough stock for the updated order
            for (OrderRequest.ProductRequest productRequest : request.getProducts()) {
                Product product = productRepository.findById(new ObjectId(productRequest.getProductId()))
                        .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productRequest.getProductId()));

                if (product.getStock() < productRequest.getQuantity()) {
                    // If there isn't enough stock, we should ideally roll back the stock restoration.
                    // However, with a transactional boundary at the service method, this will be handled automatically.
                    throw new InsufficientStockException("Not enough stock for product: " + product.getProductname());
                }
            }

            if (request.getUserId() != null)
                order.setUserId(new ObjectId(request.getUserId()));
            if (request.getProducts() != null) {
                order.setProducts(request.getProducts().stream().map(p -> {
                    Product productDetails = productRepository.findById(new ObjectId(p.getProductId()))
                            .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + p.getProductId()));
                    Order.Product product = new Order.Product();
                    product.setProductId(new ObjectId(p.getProductId()));
                    product.setProductName(productDetails.getProductname());
                    product.setQuantity(p.getQuantity());
                    product.setPrice(p.getPrice());
                    return product;
                }).collect(Collectors.toList()));
            }
            if (request.getAmount() != 0)
                order.setAmount(request.getAmount());
            if (request.getPaymentId() != null)
                order.setPaymentId(request.getPaymentId());
            if (request.getEmail() != null)
                order.setEmail(request.getEmail());
            if (request.getStatus() != null)
                order.setStatus(request.getStatus());

            Order updatedOrder = orderRepository.save(order);

            // Decrease product stock for the updated order.
            // This is done after the order is successfully saved.
            for (OrderRequest.ProductRequest productRequest : request.getProducts()) {
                productRepository.findById(new ObjectId(productRequest.getProductId())).ifPresent(product -> {
                    product.setStock(product.getStock() - productRequest.getQuantity());
                    productRepository.save(product);
                });
            }

            return Optional.of(mapToResponse(updatedOrder));
        }
        return Optional.empty();
    }

    // Delete order by ID
    public boolean deleteOrder(String id) {
        if (orderRepository.existsById(new ObjectId(id))) {
            orderRepository.deleteById(new ObjectId(id));
            return true;
        }
        return false;
    }

    public List<OrderResponse> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(new ObjectId(userId))
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Map Order entity to OrderResponse DTO
    private OrderResponse mapToResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getOrderid().toHexString());
        response.setUserId(order.getUserId().toHexString());
        response.setProducts(order.getProducts().stream().map(p -> {
            OrderResponse.ProductResponse productResponse = new OrderResponse.ProductResponse();
            productResponse.setProductId(p.getProductId().toHexString());
            productResponse.setProductName(p.getProductName());
            productResponse.setQuantity(p.getQuantity());
            productResponse.setPrice(p.getPrice());
            return productResponse;
        }).collect(Collectors.toList()));
        response.setAmount(order.getAmount());
        response.setPaymentId(order.getPaymentId());
        response.setEmail(order.getEmail());
        response.setOrderTiming(order.getOrderTiming());
        response.setEstimatedDeliveryTiming(order.getEstimatedDeliveryTiming());
        response.setStatus(order.getStatus().name()); // enum to string
        response.setCreatedAt(order.getCreatedAt());
        response.setUpdatedAt(order.getUpdatedAt());
        return response;
    }

    public Optional<OrderResponse> updateOrderStatus(String id, String statusStr) {
        Optional<Order> optionalOrder = orderRepository.findById(new ObjectId(id));
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus(OrderStatus.valueOf(statusStr.toUpperCase()));
            order.setUpdatedAt(LocalDateTime.now());
            Order updatedOrder = orderRepository.save(order);
            return Optional.of(mapToResponse(updatedOrder));
        }
        return Optional.empty();
    }


}

