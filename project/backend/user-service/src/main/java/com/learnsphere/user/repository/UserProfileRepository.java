package com.learnsphere.user.repository;

import com.learnsphere.user.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, String> {
    Optional<UserProfile> findByEmail(String email);
    List<UserProfile> findByDepartment(String department);
    List<UserProfile> findByRolesContaining(Role role);
}