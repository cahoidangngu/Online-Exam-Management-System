package com.quanchun.backendexamsystem.services;

import com.quanchun.backendexamsystem.dtos.QuizDTO;
import com.quanchun.backendexamsystem.error.QuizNotFoundException;
import com.quanchun.backendexamsystem.error.UserNotFoundException;

import java.util.List;

public interface QuizService {

    QuizDTO findOneQuiz(Long id) throws QuizNotFoundException;

    List<QuizDTO> findAllQuizzes();

    List<QuizDTO> findAllByHost(Long hostId) throws UserNotFoundException;

    void saveQuiz(QuizDTO quizDTO);

    void delete(Long id) throws QuizNotFoundException;




}
