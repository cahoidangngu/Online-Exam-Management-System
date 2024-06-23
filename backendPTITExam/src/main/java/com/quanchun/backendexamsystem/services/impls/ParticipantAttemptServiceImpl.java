package com.quanchun.backendexamsystem.services.impls;

import com.quanchun.backendexamsystem.dtos.ParticipantAnswerDTO;
import com.quanchun.backendexamsystem.dtos.ParticipantAttemptDTO;
import com.quanchun.backendexamsystem.dtos.QuestionDTO;
import com.quanchun.backendexamsystem.dtos.RegisterQuizDTO;
import com.quanchun.backendexamsystem.error.*;
import com.quanchun.backendexamsystem.mappers.ParticipantAnswerMapper;
import com.quanchun.backendexamsystem.mappers.ParticipantAttemptMapper;
import com.quanchun.backendexamsystem.models.RegisterQuiz;
import com.quanchun.backendexamsystem.models.participant.ParticipantAnswer;
import com.quanchun.backendexamsystem.models.participant.ParticipantAttempt;
import com.quanchun.backendexamsystem.repositories.ParticipantAttemptRepository;
import com.quanchun.backendexamsystem.repositories.RegisterQuizRepository;
import com.quanchun.backendexamsystem.services.ParticipantAttemptService;
import com.quanchun.backendexamsystem.services.QuestionService;
import com.quanchun.backendexamsystem.services.RegisterQuizService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
public class ParticipantAttemptServiceImpl implements ParticipantAttemptService {

    private Logger logger = LoggerFactory.getLogger(ParticipantAttemptService.class);

    public static final String PARTICIPANT_ATTEMPT_NOT_FOUND_MESSAGE = "Participant Attempt not found with id: ";
    public static final String PARTICIPANT_ATTEMPT_EXISTENCE_MESSAGE = "Participant Attempt existence!";
    @Autowired
    private ParticipantAttemptRepository participantAttemptRepository;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private ParticipantAttemptMapper participantAttemptMapper;
    @Autowired
    private ParticipantAnswerMapper participantAnswerMapper;
    @Autowired
    private RegisterQuizRepository registerQuizRepository;
    @Autowired
    private RegisterQuizService registerQuizService;

    private Integer correctAnswersCalculator(List<ParticipantAnswerDTO> participantAnswers) {
        int numberCorrectAnswers = 0;
        for (ParticipantAnswerDTO participantAnswer : participantAnswers) {
            try {
                QuestionDTO questionDTO = questionService.findOneQuestion(participantAnswer.getQuestionId());
                if (Objects.equals(questionDTO.getCorrectOptionAnswer(), participantAnswer.getUserOptionAnswerId())) {
                    numberCorrectAnswers += 1;
                }

            } catch (QuestionNotFoundException e) {
                logger.error(e.getMessage());
            }
        }
        return numberCorrectAnswers;
    }

    private Double scoreCalculator(int numberCorrectAnswers, int numberQuestions) {
        double totalScore = 0.0;
        totalScore = (double) numberCorrectAnswers / (double) numberQuestions;
        return totalScore* 10f;
    }

    private List<ParticipantAnswer> setParticipantAttemptIdForParticipantAnswer(
            List<ParticipantAnswer> participantAnswerList, Long participantAttemptId) {
        List<ParticipantAnswer> participantAnswers = new ArrayList<>();
        for (ParticipantAnswer participantAnswer : participantAnswerList) {
            participantAnswer.setParticipantAttemptId(participantAttemptId);
            participantAnswers.add(participantAnswer);
        }
        return participantAnswers;
    }

    @Override
    public ParticipantAttemptDTO saveParticipantAttempt(ParticipantAttemptDTO participantAttemptDTO) {
        List<ParticipantAnswerDTO> participantAnswers = participantAttemptDTO.getParticipantAnswerList();
        Integer correctAnswers = correctAnswersCalculator(participantAnswers);
        Double score = scoreCalculator(correctAnswers, participantAnswers.size());
        participantAttemptDTO.setCorrectAnswers(correctAnswers);
        participantAttemptDTO.setScore(score);
        ParticipantAttempt participantAttempt = participantAttemptMapper.toEntity(participantAttemptDTO);
        participantAttempt.setParticipantAnswerList(null);
        participantAttempt = participantAttemptRepository.save(participantAttempt);
        participantAttempt.setParticipantAnswerList(
                setParticipantAttemptIdForParticipantAnswer(participantAnswerMapper.toEntity(participantAnswers),
                                                            participantAttempt.getId()));
        return participantAttemptMapper.toDto(participantAttemptRepository.save(participantAttempt));
    }

    @Override
    public ParticipantAttemptDTO findOneParticipantAttempt(Long id) throws ParticipantAttemptNotFoundException {
        Optional<ParticipantAttempt> optionalParticipantAttempt = participantAttemptRepository.findById(id);
        if (optionalParticipantAttempt.isEmpty())
            throw new ParticipantAttemptNotFoundException(PARTICIPANT_ATTEMPT_NOT_FOUND_MESSAGE + id);
        ParticipantAttempt participantAttempt = optionalParticipantAttempt.get();
        return participantAttemptMapper.toDto(participantAttempt);
    }

    @Override
    public List<ParticipantAttemptDTO> findAllParticipantAttempts() {
        List<ParticipantAttempt> participantAttempts = participantAttemptRepository.findAll();
        return participantAttemptMapper.toDto(participantAttempts);
    }

    @Override
    public List<ParticipantAttemptDTO> findAllByRegisterQuiz(Long registerQuizId) throws RegisterQuizNotFoundException {
        Optional<RegisterQuiz> optionalRegisterQuiz = registerQuizRepository.findById(registerQuizId);
        if (optionalRegisterQuiz.isEmpty()) throw new RegisterQuizNotFoundException(
                RegisterQuizServiceImpl.REGISTER_QUIZ_NOT_FOUND_MESSAGE + registerQuizId);
        List<ParticipantAttempt> participantAttempts = participantAttemptRepository.findAllByRegisterQuizId(
                registerQuizId);
        return participantAttemptMapper.toDto(participantAttempts);
    }

    @Override
    public List<ParticipantAttemptDTO> findAllByQuiz(Long quizId) throws QuizNotFoundException {
        try {
            List<RegisterQuizDTO> registerQuizzes = registerQuizService.findAllByQuiz(quizId);
            List<ParticipantAttemptDTO> participantAttempts = new ArrayList<>();
            for (RegisterQuizDTO registerQuiz : registerQuizzes) {
                try {
                    participantAttempts.addAll(findAllByRegisterQuiz(registerQuiz.getId()));
                } catch (RegisterQuizNotFoundException e) {
                    logger.error(e.getMessage());
                }
            }
            return participantAttempts;
        } catch (QuizNotFoundException e) {
            logger.error(e.getMessage());
            throw new QuizNotFoundException(QuizServiceImpl.QUIZ_NOT_FOUND_MESSAGE + quizId);
        }
    }

    @Override
    public List<ParticipantAttemptDTO> findAllByUser(Long userId) throws UserNotFoundException {
        try {
            List<RegisterQuizDTO> registerQuizzes = registerQuizService.findAllByUser(userId);
            List<ParticipantAttemptDTO> participantAttempts = new ArrayList<>();
            for (RegisterQuizDTO registerQuiz : registerQuizzes) {
                try {
                    participantAttempts.addAll(findAllByRegisterQuiz(registerQuiz.getId()));
                } catch (RegisterQuizNotFoundException e) {
                    logger.error(e.getMessage());
                }
            }
            return participantAttempts;
        } catch (UserNotFoundException e) {
            logger.error(e.getMessage());
            throw new UserNotFoundException(UserServiceImpl.USER_NOT_FOUND_MESSAGE + userId);
        }
    }

    @Override
    public List<ParticipantAttemptDTO> findAllByUserAndQuiz(Long userId, Long quizId)
            throws UserNotFoundException, QuizNotFoundException {
        try {
            List<RegisterQuizDTO> registerQuizzes = registerQuizService.findAllByUserAndQuiz(userId, quizId);
            List<ParticipantAttemptDTO> participantAttempts = new ArrayList<>();
            for (RegisterQuizDTO registerQuiz : registerQuizzes) {
                try {
                    participantAttempts.addAll(findAllByRegisterQuiz(registerQuiz.getId()));
                } catch (RegisterQuizNotFoundException e) {
                    logger.error(e.getMessage());
                }
            }
            return participantAttempts;
        } catch (UserNotFoundException e) {
            logger.error(e.getMessage());
            throw new UserNotFoundException(UserServiceImpl.USER_NOT_FOUND_MESSAGE + userId);
        } catch (QuizNotFoundException e) {
            logger.error(e.getMessage());
            throw new UserNotFoundException(QuizServiceImpl.QUIZ_NOT_FOUND_MESSAGE + userId);
        }
    }


}