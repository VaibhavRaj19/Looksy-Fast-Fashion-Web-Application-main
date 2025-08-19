//    package com.Looksy.Backend.util;
//
//    import com.Looksy.Backend.dto.OrderResponse;
//    import com.Looksy.Backend.model.Order;
//    import org.bson.types.ObjectId;
//
//    public class OrderMapper {
//
//        public static OrderResponse toOrderResponse(Order order) {
//            OrderResponse response = new OrderResponse();
//            response.setId(order.getId());
//            response.setUserId(order.getUserId() != null ? order.getUserId().toHexString() : null);
//            response.setEmail(order.getEmail());
//            response.setProductId(order.getProductId() != null ? order.getProductId().toHexString() : null);
//            response.setSizeId(order.getSizeId() != null ? order.getSizeId().toHexString() : null);
//            response.setColorId(order.getColorId() != null ? order.getColorId().toHexString() : null);
//            response.setOrderTiming(order.getOrderTiming());
//            response.setEstimatedDeliveryTiming(order.getEstimatedDeliveryTiming());
//            response.setStatus(order.getStatus());
//            response.setCreatedAt(order.getCreatedAt());
//            response.setUpdatedAt(order.getUpdatedAt());
//            return response;
//        }
//    }
