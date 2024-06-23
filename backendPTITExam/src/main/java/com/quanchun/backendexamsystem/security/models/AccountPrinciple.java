package com.quanchun.backendexamsystem.security.models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Data
@AllArgsConstructor
@Builder
public class AccountPrinciple implements UserDetails {
    private static final long serialVersionUID = 1L;
    private final String username;
    private final String password;

    private Collection<? extends GrantedAuthority> roles;


    public static AccountPrinciple build(Account account) {
        return AccountPrinciple.builder()
                               .username(account.getUsername())
                               .password(account.getPassword())
                               .roles(account.getRoles())
                               .build();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
