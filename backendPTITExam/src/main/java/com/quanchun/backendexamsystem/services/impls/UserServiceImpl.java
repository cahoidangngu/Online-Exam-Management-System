package com.quanchun.backendexamsystem.services.impls;

import com.quanchun.backendexamsystem.mappers.UserMapper;
import com.quanchun.backendexamsystem.models.User;
import com.quanchun.backendexamsystem.error.UserNotFoundException;
import com.quanchun.backendexamsystem.dtos.UserDTO;
import com.quanchun.backendexamsystem.repositories.UserRepository;
import com.quanchun.backendexamsystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    public static final String USER_NOT_FOUND_MESSAGE = "User not found with id: ";
    public static final String USER_EXISTENCE_MESSAGE = "User existence!";
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Override
    public UserDTO findOneUser(Long id) throws UserNotFoundException {
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            return userMapper.toDto(user);
        } throw new UserNotFoundException(USER_NOT_FOUND_MESSAGE+id);
    }

    @Override
    public User findOneUserEntity(Long id) throws UserNotFoundException {
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()) {
            return optionalUser.get();
        } throw new UserNotFoundException(USER_NOT_FOUND_MESSAGE+id);
    }

    @Override
    public List<UserDTO> findAllUsers(){
        List<User> users = userRepository.findAll();
        return userMapper.toDto(users);
    }


}
