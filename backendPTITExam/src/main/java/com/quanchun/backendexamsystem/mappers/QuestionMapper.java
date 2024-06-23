package com.quanchun.backendexamsystem.mappers;

import com.quanchun.backendexamsystem.dtos.QuestionDTO;
import com.quanchun.backendexamsystem.models.Question;
import org.mapstruct.Mapper;

@Mapper(componentModel = "Spring")
public interface QuestionMapper extends EntityMapper<QuestionDTO, Question> {
}
