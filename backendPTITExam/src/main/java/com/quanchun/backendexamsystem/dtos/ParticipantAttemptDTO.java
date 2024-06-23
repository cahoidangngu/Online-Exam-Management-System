package com.quanchun.backendexamsystem.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonPropertyOrder({"id", "registerQuiz", "score", "correctAnswers", "beginTime", "finishTime", "participantAnswerList"})
public class ParticipantAttemptDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("registerQuiz")
    private RegisterQuizDTO registerQuiz;

    @JsonProperty("score")
    private Double score;

    @JsonProperty("correctAnswers")
    private Integer correctAnswers;

    @JsonProperty("beginTime")
    private Date beginTime;

    @JsonProperty("finishTime")
    private Date finishTime;

    @JsonProperty("participantAnswerList")
    @Valid
    private List<ParticipantAnswerDTO> participantAnswerList = new ArrayList<>();
}
