package com.learnsphere.user.controller;

import com.learnsphere.user.entity.UserProfile;
import com.learnsphere.user.service.UserProfileService;
import com.learnsphere.common.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserProfileController {
    private final UserProfileService userProfileService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserProfile>> getAllUsers() {
        return ResponseEntity.ok(userProfileService.getAllUsers());
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR') or #id == authentication.principal.id")
    public ResponseEntity<UserProfile> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userProfileService.getUserById(id));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("#id == authentication.principal.id")
    public ResponseEntity<UserProfile> updateProfile(
        @PathVariable String id,
        @RequestBody UserProfile profile
    ) {
        return ResponseEntity.ok(userProfileService.updateUserProfile(id, profile));
    }
    
    @PutMapping("/{id}/roles")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserProfile> updateRoles(
        @PathVariable String id,
        @RequestBody Set<Role> roles
    ) {
        return ResponseEntity.ok(userProfileService.updateUserRoles(id, roles));
    }
    
    @GetMapping("/department/{department}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR', 'LND')")
    public ResponseEntity<List<UserProfile>> getUsersByDepartment(
        @PathVariable String department
    ) {
        return ResponseEntity.ok(userProfileService.getUsersByDepartment(department));
    }
    
    @GetMapping("/trainers")
    public ResponseEntity<List<UserProfile>> getTrainers() {
        return ResponseEntity.ok(userProfileService.getTrainers());
    }
}