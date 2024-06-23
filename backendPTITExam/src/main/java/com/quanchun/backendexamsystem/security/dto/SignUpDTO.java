package com.quanchun.backendexamsystem.security.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpDTO {
    @NotBlank
    @Size(min=3, max = 20)
    private String username;

    @Size(max = 50)
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String confirmPassword;
}
