package com.quanchun.backendexamsystem.models;

import com.quanchun.backendexamsystem.security.models.Account;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private Date dob;
    private String studyClass;
    private String phone;
    private Boolean gender;
    private String address;
    private String imageUrl;
    @OneToOne
    private Account account;
}
