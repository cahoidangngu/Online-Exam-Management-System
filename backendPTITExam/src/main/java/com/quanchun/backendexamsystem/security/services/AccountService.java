package com.quanchun.backendexamsystem.security.services;

import com.quanchun.backendexamsystem.security.models.Account;

import java.util.List;
import java.util.Optional;

public interface AccountService {
    Optional<Account> findByUsername(String username);
    Account toDTO(Account account);
    void save(Account account);
    void addAccount(Account account);
    Account findById(Long id);
    Account findByEmail(String email);

    List<String> listAllUsernames();
}
