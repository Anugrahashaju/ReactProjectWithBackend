package com.learnsphere.user.service;

import com.learnsphere.user.entity.UserProfile;
import com.learnsphere.user.repository.UserProfileRepository;
import com.learnsphere.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;
    
    public List<UserProfile> getAllUsers() {
        return userProfileRepository.findAll();
    }
    
    public UserProfile getUserById(String id) {
        return userProfileRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }
    
    public UserProfile getUserByEmail(String email) {
        return userProfileRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }
    
    @Transactional
    public UserProfile updateUserProfile(String id, UserProfile updatedProfile) {
        UserProfile existingProfile = getUserById(id);
        
        existingProfile.setName(updatedProfile.getName());
        existingProfile.setDepartment(updatedProfile.getDepartment());
        existingProfile.setPosition(updatedProfile.getPosition());
        
        return userProfileRepository.save(existingProfile);
    }
    
    @Transactional
    public UserProfile updateUserRoles(String id, Set<Role> roles) {
        UserProfile user = getUserById(id);
        user.setRoles(roles);
        return userProfileRepository.save(user);
    }
    
    public List<UserProfile> getUsersByDepartment(String department) {
        return userProfileRepository.findByDepartment(department);
    }
    
    public List<UserProfile> getTrainers() {
        return userProfileRepository.findByRolesContaining(Role.ROLE_TRAINER);
    }
}