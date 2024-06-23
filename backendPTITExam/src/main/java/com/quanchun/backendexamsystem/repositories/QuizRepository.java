package com.quanchun.backendexamsystem.repositories;

import com.quanchun.backendexamsystem.models.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @Query(value = "select q.* from quiz q where q.user_id = :user_id", nativeQuery = true)
    List<Quiz> findAllByUserId(@Param("user_id") Long userId);


}
