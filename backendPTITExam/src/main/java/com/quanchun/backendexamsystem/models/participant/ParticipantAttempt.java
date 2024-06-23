package com.quanchun.backendexamsystem.models.participant;

import com.quanchun.backendexamsystem.models.RegisterQuiz;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Table(name = "participant_attempt")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParticipantAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    private RegisterQuiz registerQuiz;

    @NotNull
    private Double score;

    private Integer correctAnswers;


    private Date beginTime;

    private Date finishTime;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "participant_attempt_id")
    private List<ParticipantAnswer> participantAnswerList;

}