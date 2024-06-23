package com.quanchun.backendexamsystem.services;

import com.quanchun.backendexamsystem.dtos.ParticipantAttemptDTO;
import com.quanchun.backendexamsystem.error.ParticipantAttemptNotFoundException;
import com.quanchun.backendexamsystem.error.QuizNotFoundException;
import com.quanchun.backendexamsystem.error.RegisterQuizNotFoundException;
import com.quanchun.backendexamsystem.error.UserNotFoundException;

import java.util.List;


public interface ParticipantAttemptService {

    ParticipantAttemptDTO saveParticipantAttempt(
            ParticipantAttemptDTO participantAttemptDTO);

    ParticipantAttemptDTO findOneParticipantAttempt(Long id) throws ParticipantAttemptNotFoundException;

    List<ParticipantAttemptDTO> findAllParticipantAttempts();

    List<ParticipantAttemptDTO> findAllByRegisterQuiz(Long registerQuizId)throws RegisterQuizNotFoundException;

    List<ParticipantAttemptDTO> findAllByQuiz(Long quizId)throws QuizNotFoundException;

    List<ParticipantAttemptDTO> findAllByUser(Long userId)throws UserNotFoundException;

    List<ParticipantAttemptDTO> findAllByUserAndQuiz(Long userId,
                                                     Long quizId)throws UserNotFoundException, QuizNotFoundException;
}