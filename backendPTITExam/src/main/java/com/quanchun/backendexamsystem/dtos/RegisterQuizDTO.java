package com.quanchun.backendexamsystem.dtos;

import com.quanchun.backendexamsystem.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterQuizDTO {
    private Long id;
    private QuizDTO quiz;
    private UserDTO user;
    private Boolean status;
    private Date startTime;
    private Date endTime;
}