package com.Looksy.Backend.security;

import com.Looksy.Backend.config.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                // 🔓 Admin Endpoints (Public)
                                "/admin/register",
                                "/admin/check_admin_login",
                                "/admin/cleartoken",
                                "/admin/isUserAuth",


                                "/api/orders/create",
                                "/api/orders/all",
                                "/api/orders/by",
                                "/api/orders/update/**",
                                "/api/orders/delete/**",

                                "/address/add_address",
                                "/address/update_address",
                                "/address/delete_address/**",
                                "/address/display_all/**",
                                "/address/display_email/**",
                                "/address/display_by_address_id/**",

                                // 🔓 User Registration & Authentication
                                "/user/register",
                                "/user/get-by/**",
                                "/user/verify-otp",
                                "/user/resend-otp",
                                "/user/login",
                                "/user/update-profile",
                                "/user/verify-email-change",
                                "/user/request-email-change-otp",

                                // 🔓 Banners
                                "/api/banners/all",
                                "/api/banners/upload",

                                // 🔓 Category APIs
                                "/category/display_all_category",
                                "/category/add_new_category",
                                "/category/edit_category_data",
                                "/category/delete_category_data",

                                // 🔓 Subcategory APIs
                                "/subcategory/all",
                                "/subcategory/add",
                                "/subcategory/delete/**",
                                "/subcategory/edit_subcategory_data",
                                "/subcategory/by-category/**",
                                "/subcategory/by-priority/**",

                                // 🔓 Products
                                "/api/products/display_all_product",
                                "/api/products/add_new_product",
                                "/api/products/edit_product_data",
                                "/api/products/fetch_all_product",
                                "/api/products/delete_product_data",
                                "/api/products/by_salestatus",
                                "/api/products/picture",
                                "/api/products/update_icon",
                                "/api/products/search",
                                "/api/products/sorted-by-price",
                                "/api/products/fetch_by_ids",
                                "/api/products/by-size",

                                // 🔓 Dimensions
                                "/api/dimensions/display_all_dimensions",
                                "/api/dimensions/add_new_dimension",
                                "/api/dimensions/edit_dimension_data",
                                "/api/dimensions/fetch_all_dimensions",
                                "/api/dimensions/delete_dimension_data/**",

                                // 🔓 Colors
                                "/api/colors/display_all_color",
                                "/api/colors/product-by-id",
                                "/api/colors/add_new_color",
                                "/api/colors/delete_color_data",
                                "/api/colors/edit_color_data"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // ✅ Provide AuthenticationManager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // ✅ Provide BCryptPasswordEncoder for password hashing
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}