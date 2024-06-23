package com.quanchun.backendexamsystem.security.services.impls;


import com.quanchun.backendexamsystem.security.models.Role;
import com.quanchun.backendexamsystem.security.repositories.RoleRepository;
import com.quanchun.backendexamsystem.security.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role findOne(Long id) {
        return roleRepository.findById(id).orElse(null);
    }

    @Override
    public Iterable<Role> findAll() {
        return roleRepository.findAll();
    }
}
