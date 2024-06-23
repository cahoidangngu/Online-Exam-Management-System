package com.quanchun.backendexamsystem.repositories;

import com.quanchun.backendexamsystem.models.participant.ParticipantAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantAttemptRepository extends JpaRepository<ParticipantAttempt, Long> {
    List<ParticipantAttempt> findAllByRegisterQuizId(Long id);
}
