package com.quanchun.backendexamsystem.security.controller;

import com.quanchun.backendexamsystem.security.dto.AuthDTO;
import com.quanchun.backendexamsystem.security.jwt.service.JwtResponse;
import com.quanchun.backendexamsystem.security.jwt.service.JwtService;
import com.quanchun.backendexamsystem.security.models.Account;
import com.quanchun.backendexamsystem.security.models.Role;
import com.quanchun.backendexamsystem.security.services.RoleService;
import com.quanchun.backendexamsystem.security.services.impls.AccountServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager authenticationManager;


    @Autowired
    private JwtService jwtService;

    @Autowired
    private AccountServiceImpl accountService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleService roleService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthDTO authDTO) {
        Account accountInfo = accountService.findByUsername(authDTO.getUsername()).get();
        if (accountInfo.getStatus().equals("block")){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authDTO.getUsername(), authDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtService.GenerateToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(new JwtResponse(accountInfo.getId(), jwt,
                                                 accountInfo.getUsername(), accountInfo.getUsername(), userDetails.getAuthorities()));

    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        String token = extractTokenFromRequest(request);
        return ResponseEntity.ok("Logged out successfully");
    }

    public String extractTokenFromRequest(HttpServletRequest request) {
        // Get the Authorization header from the request
        String authorizationHeader = request.getHeader("Authorization");

        // Check if the Authorization header is not null and starts with "Bearer "
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            // Extract the JWT token (remove "Bearer " prefix)
            return authorizationHeader.substring(7);
        }

        // If the Authorization header is not valid, return null
        return null;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<String> register(@RequestBody Account account) {
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        accountService.save(account);
        accountService.addAccount(account);
        return new ResponseEntity<>("Vui lòng quay lại trang đăng nhập", HttpStatus.OK);
    }

    @RequestMapping(value = "/roles", method = RequestMethod.GET)
    public ResponseEntity<Iterable<Role>> getRoles() {
        return new ResponseEntity<>(roleService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/username")
    public ResponseEntity<Iterable<String>> findListUsernames() {
        logger.info("List all usernames");
        return new ResponseEntity<>(accountService.listAllUsernames(), HttpStatus.OK);
    }
}
