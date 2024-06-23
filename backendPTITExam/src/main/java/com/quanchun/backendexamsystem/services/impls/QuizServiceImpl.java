package com.quanchun.backendexamsystem.services.impls;

import com.quanchun.backendexamsystem.dtos.OptionAnswerDTO;
import com.quanchun.backendexamsystem.dtos.QuestionDTO;
import com.quanchun.backendexamsystem.dtos.QuizDTO;
import com.quanchun.backendexamsystem.error.QuizNotFoundException;
import com.quanchun.backendexamsystem.error.UserNotFoundException;
import com.quanchun.backendexamsystem.mappers.QuizMapper;
import com.quanchun.backendexamsystem.models.Quiz;
import com.quanchun.backendexamsystem.models.User;
import com.quanchun.backendexamsystem.repositories.QuizRepository;
import com.quanchun.backendexamsystem.repositories.UserRepository;
import com.quanchun.backendexamsystem.services.OptionAnswerService;
import com.quanchun.backendexamsystem.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizServiceImpl implements QuizService {
    public static final String QUIZ_NOT_FOUND_MESSAGE = "Quiz not found with id: ";
    public static final String QUIZ_EXISTENCE_MESSAGE = "Quiz existence!";

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OptionAnswerService optionAnswerService;

    @Autowired
    private QuizMapper quizMapper;

    private List<OptionAnswerDTO> saveListOptionAnswers(List<OptionAnswerDTO> optionAnswers) {
        return optionAnswerService.saveListOptionAnswers(optionAnswers);
    }

    private List<QuestionDTO> setListOptionAnswersForListQuestions(List<QuestionDTO> questionList) {
        List<QuestionDTO> questions = new ArrayList<>();
        for (QuestionDTO question : questionList) {
            List<OptionAnswerDTO> optionAnswers = saveListOptionAnswers(question.getOptionAnswerList());
            int correctOptionAnswerIndex = question.getCorrectOptionAnswer().intValue();
            question.setOptionAnswerList(optionAnswers);
            question.setCorrectOptionAnswer(optionAnswers.get(correctOptionAnswerIndex).getId());
            questions.add(question);
        }
        return questions;
    }


    @Override
    public QuizDTO findOneQuiz(Long id) throws QuizNotFoundException {
        Optional<Quiz> optionalQuiz = quizRepository.findById(id);
        if (optionalQuiz.isPresent()) {
            Quiz quiz = optionalQuiz.get();
            return quizMapper.toDto(quiz);
        }
        throw new QuizNotFoundException(QUIZ_NOT_FOUND_MESSAGE + id);
    }

    @Override
    public List<QuizDTO> findAllQuizzes() {
        List<Quiz> quizzes = quizRepository.findAll();
        return quizMapper.toDto(quizzes);
    }

    @Override
    public List<QuizDTO> findAllByHost(Long userId) throws UserNotFoundException {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) throw new UserNotFoundException(UserServiceImpl.USER_NOT_FOUND_MESSAGE + userId);
        List<Quiz> quizzes = quizRepository.findAllByUserId(userId);
        return quizMapper.toDto(quizzes);
    }


    @Override
    public void saveQuiz(QuizDTO quizDTO) {
        List<QuestionDTO> questions = setListOptionAnswersForListQuestions(quizDTO.getQuestionList());
        quizDTO.setQuestionList(questions);
        Quiz quiz = quizMapper.toEntity(quizDTO);
        quizRepository.save(quiz);
    }


    @Override
    public void delete(Long id) throws QuizNotFoundException {
        Optional<Quiz> optionalQuiz = quizRepository.findById(id);
        if (optionalQuiz.isPresent()) {
            Quiz quiz = optionalQuiz.get();
            quiz.setStatus(1);
            quizRepository.save(quiz);
        } else
            throw new QuizNotFoundException(QUIZ_NOT_FOUND_MESSAGE + id);
    }


}
