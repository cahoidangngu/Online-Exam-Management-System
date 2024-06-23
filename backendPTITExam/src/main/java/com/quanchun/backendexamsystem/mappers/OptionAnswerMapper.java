package com.quanchun.backendexamsystem.mappers;

import com.quanchun.backendexamsystem.dtos.OptionAnswerDTO;
import com.quanchun.backendexamsystem.models.OptionAnswer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "Spring")
public interface OptionAnswerMapper extends EntityMapper<OptionAnswerDTO, OptionAnswer> {
}
