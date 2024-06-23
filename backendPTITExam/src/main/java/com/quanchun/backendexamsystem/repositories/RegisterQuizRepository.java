package com.quanchun.backendexamsystem.repositories;

import com.quanchun.backendexamsystem.models.RegisterQuiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface RegisterQuizRepository extends JpaRepository<RegisterQuiz, Long> {
    List<RegisterQuiz> findAllByUserId(Long userId);

    List<RegisterQuiz> findAllByQuizId(Long quizId);

    List<RegisterQuiz> findAllByStatus(Boolean status);
    List<RegisterQuiz> findAllByUserIdAndQuizId(Long userId, Long quizId);

}
