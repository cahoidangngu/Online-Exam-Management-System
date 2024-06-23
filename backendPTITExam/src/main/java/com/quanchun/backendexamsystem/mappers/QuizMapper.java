package com.quanchun.backendexamsystem.mappers;

import com.quanchun.backendexamsystem.models.Quiz;
import com.quanchun.backendexamsystem.dtos.QuizDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "Spring")
public interface QuizMapper extends EntityMapper<QuizDTO, Quiz> {
}
