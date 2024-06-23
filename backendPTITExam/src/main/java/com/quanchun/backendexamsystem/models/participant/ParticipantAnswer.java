package com.quanchun.backendexamsystem.models.participant;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "participant_answer")
@Builder
@IdClass(ParticipantAnswerId.class)
public class ParticipantAnswer {
    @Id
    @Column(name = "question_id")
    private Long questionId;

    @Id
    @Column(name = "participant_attempt_id")
    private Long participantAttemptId;

    @NotNull
    private Long userOptionAnswerId;
}