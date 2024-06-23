package com.quanchun.backendexamsystem.repositories;

import com.quanchun.backendexamsystem.models.participant.ParticipantAnswer;
import com.quanchun.backendexamsystem.models.participant.ParticipantAnswerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantAnswerRepository extends JpaRepository<ParticipantAnswer, ParticipantAnswerId> {
    List<ParticipantAnswer> findAllByParticipantAttemptId(Long participantAttemptId);
}
