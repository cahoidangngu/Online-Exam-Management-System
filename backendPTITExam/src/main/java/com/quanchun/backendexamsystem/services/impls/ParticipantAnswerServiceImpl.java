package com.quanchun.backendexamsystem.services.impls;

import com.quanchun.backendexamsystem.dtos.ParticipantAnswerDTO;
import com.quanchun.backendexamsystem.error.ParticipantAttemptNotFoundException;
import com.quanchun.backendexamsystem.mappers.ParticipantAnswerMapper;
import com.quanchun.backendexamsystem.models.participant.ParticipantAnswer;
import com.quanchun.backendexamsystem.models.participant.ParticipantAttempt;
import com.quanchun.backendexamsystem.repositories.ParticipantAnswerRepository;
import com.quanchun.backendexamsystem.repositories.ParticipantAttemptRepository;
import com.quanchun.backendexamsystem.services.ParticipantAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParticipantAnswerServiceImpl implements ParticipantAnswerService {

    @Autowired
    private ParticipantAnswerRepository participantAnswerRepository;

    @Autowired
    private ParticipantAttemptRepository participantAttemptRepository;

    @Autowired
    private ParticipantAnswerMapper participantAnswerMapper;


    @Override
    public List<ParticipantAnswerDTO> findAllParticipantAnswers() {
        List<ParticipantAnswer> participantAnswers = participantAnswerRepository.findAll();
        return participantAnswerMapper.toDto(participantAnswers);
    }



    @Override
    public List<ParticipantAnswerDTO> findAllByParticipantAttempt(Long participantAttemptId) throws ParticipantAttemptNotFoundException {
        Optional<ParticipantAttempt> optionalParticipantAttempt =
                participantAttemptRepository.findById(participantAttemptId);
        if(optionalParticipantAttempt.isEmpty()) throw new ParticipantAttemptNotFoundException(ParticipantAttemptServiceImpl.PARTICIPANT_ATTEMPT_NOT_FOUND_MESSAGE+participantAttemptId);
        List<ParticipantAnswer> participantAnswers = participantAnswerRepository.findAllByParticipantAttemptId(participantAttemptId);
        return participantAnswerMapper.toDto(participantAnswers);
    }

}
