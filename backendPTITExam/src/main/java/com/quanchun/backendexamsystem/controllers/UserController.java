package com.quanchun.backendexamsystem.controllers;

import com.quanchun.backendexamsystem.dtos.UserDTO;
import com.quanchun.backendexamsystem.error.UserNotFoundException;
import com.quanchun.backendexamsystem.models.User;
import com.quanchun.backendexamsystem.services.UserService;
import jakarta.annotation.security.RolesAllowed;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    // create and update user
    @PostMapping
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        try {
            User oldUser = userService.findOneUserEntity(user.getId());
            if (user.getImageUrl() == null) {
                user.setImageUrl(oldUser.getImageUrl());
            }
            if (user.getAccount() == null) {
                user.setAccount(oldUser.getAccount());
            }
            logger.info("Update user: {}", oldUser.getId());
        } catch (UserNotFoundException e) {
            logger.info("Create new user");
        }
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> findOneUser(@PathVariable("id") Long id) {
        try {
            UserDTO userDTO = userService.findOneUser(id);
            logger.info("Find user: {}", userDTO.getId());
            return new ResponseEntity<>(userDTO, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/")
    public ResponseEntity<?> findAllUser() {
        logger.info("Find all users");
        return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.OK);
    }

}
