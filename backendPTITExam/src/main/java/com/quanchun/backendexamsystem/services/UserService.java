package com.quanchun.backendexamsystem.services;

import com.quanchun.backendexamsystem.error.UserNotFoundException;
import com.quanchun.backendexamsystem.dtos.UserDTO;
import com.quanchun.backendexamsystem.models.User;

import java.util.List;

public interface UserService {

    void saveUser(User user);

    List<UserDTO> findAllUsers();

    UserDTO findOneUser(Long id) throws UserNotFoundException;

    User findOneUserEntity(Long id) throws UserNotFoundException;

}
