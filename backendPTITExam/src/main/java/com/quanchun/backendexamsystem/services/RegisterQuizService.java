package com.quanchun.backendexamsystem.services;

import com.quanchun.backendexamsystem.dtos.RegisterQuizDTO;
import com.quanchun.backendexamsystem.error.QuizNotFoundException;
import com.quanchun.backendexamsystem.error.RegisterQuizNotFoundException;
import com.quanchun.backendexamsystem.error.UserNotFoundException;

import java.util.List;

public interface RegisterQuizService {

    void saveRegisterQuiz(RegisterQuizDTO registerQuizDTO) throws QuizNotFoundException, UserNotFoundException;

    RegisterQuizDTO findOneRegisterQuiz(Long id) throws RegisterQuizNotFoundException;

    List<RegisterQuizDTO> findAllByQuiz(Long quizId)throws QuizNotFoundException;

    List<RegisterQuizDTO> findAllByUser(Long userId)throws UserNotFoundException;

    List<RegisterQuizDTO> findAllByUserAndQuiz(Long userId,
                                               Long quizId) throws UserNotFoundException, QuizNotFoundException;

    List<RegisterQuizDTO> findAllByStatus(Boolean status);

    List<RegisterQuizDTO> findAllRegisterQuizzes();
}