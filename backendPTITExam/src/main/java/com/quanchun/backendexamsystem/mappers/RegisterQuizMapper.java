package com.quanchun.backendexamsystem.mappers;

import com.quanchun.backendexamsystem.dtos.RegisterQuizDTO;
import com.quanchun.backendexamsystem.models.RegisterQuiz;
import org.mapstruct.Mapper;

@Mapper(componentModel = "Spring")
public interface RegisterQuizMapper extends EntityMapper<RegisterQuizDTO, RegisterQuiz> {
}
