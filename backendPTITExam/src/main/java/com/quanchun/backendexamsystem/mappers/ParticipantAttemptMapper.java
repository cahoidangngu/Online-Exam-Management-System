package com.quanchun.backendexamsystem.mappers;

import com.quanchun.backendexamsystem.dtos.ParticipantAttemptDTO;
import com.quanchun.backendexamsystem.models.participant.ParticipantAttempt;
import org.mapstruct.Mapper;

@Mapper(componentModel = "Spring")
public interface ParticipantAttemptMapper extends EntityMapper<ParticipantAttemptDTO, ParticipantAttempt> {
}
