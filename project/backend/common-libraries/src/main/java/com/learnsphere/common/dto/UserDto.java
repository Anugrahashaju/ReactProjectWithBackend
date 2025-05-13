package com.learnsphere.common.dto;

import com.learnsphere.common.enums.Role;
import lombok.Data;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Set;

@Data
public class UserDto {
    private String id;
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    private Set<Role> roles;
    private String department;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}