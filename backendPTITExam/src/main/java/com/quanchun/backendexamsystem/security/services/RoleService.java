package com.quanchun.backendexamsystem.security.services;

import com.quanchun.backendexamsystem.security.models.Role;

public interface RoleService {
    Role findOne(Long id);

    Iterable<Role> findAll ();
}
