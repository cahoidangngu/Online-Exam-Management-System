package com.quanchun.backendexamsystem.repositories;

import com.quanchun.backendexamsystem.models.OptionAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionAnswerRepository extends JpaRepository<OptionAnswer, Long> {
}
