package com.quanchun.backendexamsystem.services.impls;

import com.quanchun.backendexamsystem.error.ParticipantAttemptNotFoundException;
import com.quanchun.backendexamsystem.error.QuizNotFoundException;
import com.quanchun.backendexamsystem.error.RegisterQuizNotFoundException;
import com.quanchun.backendexamsystem.mappers.QuestionMapper;
import com.quanchun.backendexamsystem.models.Question;
import com.quanchun.backendexamsystem.error.QuestionNotFoundException;
import com.quanchun.backendexamsystem.dtos.QuestionDTO;
import com.quanchun.backendexamsystem.models.Quiz;
import com.quanchun.backendexamsystem.models.RegisterQuiz;
import com.quanchun.backendexamsystem.models.participant.ParticipantAnswer;
import com.quanchun.backendexamsystem.models.participant.ParticipantAttempt;
import com.quanchun.backendexamsystem.repositories.ParticipantAttemptRepository;
import com.quanchun.backendexamsystem.repositories.QuestionRepository;
import com.quanchun.backendexamsystem.repositories.QuizRepository;
import com.quanchun.backendexamsystem.repositories.RegisterQuizRepository;
import com.quanchun.backendexamsystem.services.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


@Slf4j
@Service
public class QuestionServiceImpl implements QuestionService {
    public static final String QUESTION_NOT_FOUND_MESSAGE = "Question not found with id: ";
    public static final String QUESTION_EXISTENCE_MESSAGE = "Question existence!";

    private Logger logger = LoggerFactory.getLogger(QuestionService.class);
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private RegisterQuizRepository registerQuizRepository;
    @Autowired
    private ParticipantAttemptRepository participantAttemptRepository;
    @Autowired
    private QuestionMapper questionMapper;



    @Override
    public QuestionDTO findOneQuestion(Long id) throws QuestionNotFoundException {
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            return questionMapper.toDto(question);
        }
        throw new QuestionNotFoundException(QUESTION_NOT_FOUND_MESSAGE + id);
    }

    @Override
    public List<QuestionDTO> findAllByQuiz(Long quizId) throws QuizNotFoundException {
        Optional<Quiz> optionalQuiz = quizRepository.findById(quizId);
        if (optionalQuiz.isEmpty())
            throw new QuizNotFoundException(QuizServiceImpl.QUIZ_NOT_FOUND_MESSAGE + quizId);
        Quiz quiz = optionalQuiz.get();
        List<Question> questions = quiz.getQuestionList();
        return questionMapper.toDto(questions);
    }

    @Override
    public List<QuestionDTO> findAllByRegisterQuiz(Long registerQuizId)
            throws RegisterQuizNotFoundException, QuizNotFoundException {
        Optional<RegisterQuiz> optionalRegisterQuiz = registerQuizRepository.findById(registerQuizId);
        if (optionalRegisterQuiz.isEmpty())
            throw new RegisterQuizNotFoundException(
                    RegisterQuizServiceImpl.REGISTER_QUIZ_NOT_FOUND_MESSAGE + registerQuizId);
        RegisterQuiz registerQuiz = optionalRegisterQuiz.get();
        List<QuestionDTO> registerQuizQuestions = findAllByQuiz(registerQuiz.getQuiz().getId());
        for (QuestionDTO questionDTO : registerQuizQuestions) {
            questionDTO.setCorrectOptionAnswer(0L);
        }
        return registerQuizQuestions;
    }

    @Override
    public List<QuestionDTO> findAllByParticipantAttempt(Long participantAttemptId)
            throws ParticipantAttemptNotFoundException {
        Optional<ParticipantAttempt> optionalParticipantAttempt = participantAttemptRepository.findById(
                participantAttemptId);
        if (optionalParticipantAttempt.isEmpty())
            throw new ParticipantAttemptNotFoundException(
                    ParticipantAttemptServiceImpl.PARTICIPANT_ATTEMPT_NOT_FOUND_MESSAGE + participantAttemptId);
        List<QuestionDTO> questions = new ArrayList<>();
        ParticipantAttempt participantAttempt = optionalParticipantAttempt.get();
        for (ParticipantAnswer participantAnswer : participantAttempt.getParticipantAnswerList()) {
            try {
                QuestionDTO question = findOneQuestion(participantAnswer.getQuestionId());
                questions.add(question);
            } catch (QuestionNotFoundException e) {
                logger.error(QUESTION_NOT_FOUND_MESSAGE + "{}", participantAnswer.getQuestionId());
            }
        }
        return questions;
    }


    @Override
    public List<QuestionDTO> findAllQuestions() {
        List<Question> questions = questionRepository.findAll();
        return questionMapper.toDto(questions);
    }


}
