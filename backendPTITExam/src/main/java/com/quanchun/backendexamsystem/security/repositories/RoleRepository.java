package com.quanchun.backendexamsystem.security.repositories;

import com.quanchun.backendexamsystem.security.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
