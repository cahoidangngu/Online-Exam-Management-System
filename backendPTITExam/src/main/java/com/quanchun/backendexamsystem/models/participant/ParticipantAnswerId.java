package com.quanchun.backendexamsystem.models.participant;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ParticipantAnswerId implements Serializable {

    @Column(name = "participant_attempt_id")
    private Long participantAttemptId;
    @Column(name = "question_bank_id")
    private Long questionId;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ParticipantAnswerId participantAnswerId = (ParticipantAnswerId) o;
        return (Objects.equals(participantAttemptId, ((ParticipantAnswerId) o).getParticipantAttemptId())) &&
                (Objects.equals(questionId, ((ParticipantAnswerId) o).getQuestionId()));
    }

    @Override
    public int hashCode() {
        return Objects.hash(participantAttemptId, questionId);
    }

}