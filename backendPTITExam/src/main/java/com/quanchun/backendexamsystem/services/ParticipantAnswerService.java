package com.quanchun.backendexamsystem.services;

import com.quanchun.backendexamsystem.dtos.ParticipantAnswerDTO;
import com.quanchun.backendexamsystem.error.ParticipantAttemptNotFoundException;

import java.util.List;


public interface ParticipantAnswerService {

    List<ParticipantAnswerDTO> findAllParticipantAnswers();

    List<ParticipantAnswerDTO> findAllByParticipantAttempt(
            Long participantAttemptId) throws ParticipantAttemptNotFoundException;
}
