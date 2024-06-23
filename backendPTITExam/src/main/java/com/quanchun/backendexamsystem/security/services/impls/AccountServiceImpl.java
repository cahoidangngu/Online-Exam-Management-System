package com.quanchun.backendexamsystem.security.services.impls;

import com.quanchun.backendexamsystem.models.User;
import com.quanchun.backendexamsystem.security.services.AccountService;
import com.quanchun.backendexamsystem.security.models.Account;
import com.quanchun.backendexamsystem.security.models.AccountPrinciple;
import com.quanchun.backendexamsystem.security.models.Role;
import com.quanchun.backendexamsystem.security.repositories.AccountRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class AccountServiceImpl implements UserDetailsService, AccountService {

    private final Logger LOGGER = LoggerFactory.getLogger(UserDetailsService.class);

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        LOGGER.debug("Entering in loadUserByUsername Method...");
        Optional<Account> optionalAccount = accountRepository.findByUsername(username);
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            LOGGER.info("User Authenticated Successfully..!!!");
            return AccountPrinciple.build(account);
        }
        LOGGER.error("Username not found: {}", username);
        return null;
    }

    @Override
    public Optional<Account> findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    @Override
    public Account toDTO(Account account) {
        return Account.builder().id(account.getId()).username(account.getUsername()).roles(account.getRoles()).build();
    }

    @Override
    public void save(Account account) {
        Set<Role> roles = new HashSet<>();
        Role role = new Role();
        role.setId(2L);
        roles.add(role);
        account.setRoles(roles);
        accountRepository.save(account);
    }

    @Override
    public void addAccount(Account account) {
        accountRepository.addUser(account.getId());
    }

    @Override
    public Account findById(Long id) {
        Optional<Account> optionalAccount = accountRepository.findById(id);
        return optionalAccount.map(this::toDTO).orElse(null);
    }

    @Override
    public Account findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    @Override
    public List<String> listAllUsernames() {
        List<String> usernames = new ArrayList<>();
        Iterable<Account> accountList = accountRepository.findAll();
        for (Account account : accountList) {
            usernames.add(account.getUsername());
        }
        return usernames;
    }
}
