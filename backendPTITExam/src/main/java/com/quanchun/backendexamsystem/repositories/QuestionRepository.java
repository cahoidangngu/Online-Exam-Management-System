package com.quanchun.backendexamsystem.repositories;

import com.quanchun.backendexamsystem.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
