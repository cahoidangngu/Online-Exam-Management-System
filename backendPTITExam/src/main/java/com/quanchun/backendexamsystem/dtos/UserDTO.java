package com.quanchun.backendexamsystem.dtos;

import com.quanchun.backendexamsystem.security.models.Account;
import com.quanchun.backendexamsystem.security.models.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String fullName;
    private Date dob;
    private String studyClass;
    private String phone;
    private Boolean gender;
    private String address;
    private String imageUrl;
    private Account account;
}
