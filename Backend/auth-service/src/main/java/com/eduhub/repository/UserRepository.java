package com.eduhub.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eduhub.entity.ApprovalStatus;
import com.eduhub.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByApprovalStatusAndRole_RoleNameContainingIgnoreCase(
            ApprovalStatus approvalStatus,
            String roleName
    );
}