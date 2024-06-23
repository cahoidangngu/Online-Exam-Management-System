package com.quanchun.backendexamsystem.services;

import com.quanchun.backendexamsystem.dtos.QuestionDTO;
import com.quanchun.backendexamsystem.error.ParticipantAttemptNotFoundException;
import com.quanchun.backendexamsystem.error.QuestionNotFoundException;
import com.quanchun.backendexamsystem.error.QuizNotFoundException;
import com.quanchun.backendexamsystem.error.RegisterQuizNotFoundException;

import java.util.List;

public interface QuestionService {


    QuestionDTO findOneQuestion(Long id) throws QuestionNotFoundException;

    List<QuestionDTO> findAllByQuiz(Long quizId) throws QuizNotFoundException;

    List<QuestionDTO> findAllByRegisterQuiz(Long registerQuizId)
            throws RegisterQuizNotFoundException, QuizNotFoundException;


    List<QuestionDTO> findAllByParticipantAttempt(Long participantAttemptId)
            throws ParticipantAttemptNotFoundException;

    List<QuestionDTO> findAllQuestions();




}
