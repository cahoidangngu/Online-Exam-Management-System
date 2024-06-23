package com.quanchun.backendexamsystem.dtos;



import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.quanchun.backendexamsystem.dtos.QuestionDTO;
import lombok.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuizDTO {
    private Long id;
    private UserDTO user;
    private String title;
    private String description;
    private Integer type;
    private Integer difficulty;
    private String subject;
    private Date createdAt;
    private Date startedAt;
    private Date endedAt;
    private Integer status;
    private Integer duration;
    private List<QuestionDTO> questionList;
}
