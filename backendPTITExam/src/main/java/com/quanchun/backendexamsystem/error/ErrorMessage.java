package com.quanchun.backendexamsystem.error;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorMessage {
    private HttpStatus status;
    private String message;
}
