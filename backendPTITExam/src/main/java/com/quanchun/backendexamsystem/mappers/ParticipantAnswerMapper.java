package com.quanchun.backendexamsystem.mappers;

import com.quanchun.backendexamsystem.dtos.ParticipantAnswerDTO;
import com.quanchun.backendexamsystem.models.participant.ParticipantAnswer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "Spring")
public interface ParticipantAnswerMapper extends EntityMapper<ParticipantAnswerDTO, ParticipantAnswer> {
}
