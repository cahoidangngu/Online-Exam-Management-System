package com.quanchun.backendexamsystem.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionDTO {
    private Long id;
    private String questionTitle;
    private Integer difficulty;
    private Long correctOptionAnswer;
    private String category;
    private List<OptionAnswerDTO> optionAnswerList;
}
