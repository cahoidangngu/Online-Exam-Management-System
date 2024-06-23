package com.quanchun.backendexamsystem.services.impls;

import com.quanchun.backendexamsystem.dtos.QuizDTO;
import com.quanchun.backendexamsystem.dtos.RegisterQuizDTO;
import com.quanchun.backendexamsystem.dtos.UserDTO;
import com.quanchun.backendexamsystem.error.QuizNotFoundException;
import com.quanchun.backendexamsystem.error.RegisterQuizNotFoundException;
import com.quanchun.backendexamsystem.error.UserNotFoundException;
import com.quanchun.backendexamsystem.mappers.RegisterQuizMapper;
import com.quanchun.backendexamsystem.models.RegisterQuiz;
import com.quanchun.backendexamsystem.repositories.RegisterQuizRepository;
import com.quanchun.backendexamsystem.services.QuizService;
import com.quanchun.backendexamsystem.services.RegisterQuizService;
import com.quanchun.backendexamsystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class RegisterQuizServiceImpl implements RegisterQuizService {
    public static final String REGISTER_QUIZ_NOT_FOUND_MESSAGE = "Register Quiz not found with id: ";
    public static final String REGISTER_QUIZ_EXISTENCE_MESSAGE = "Register Quiz existence!";

    @Autowired
    private RegisterQuizRepository registerQuizRepository;
    @Autowired
    private RegisterQuizMapper registerQuizMapper;
    @Autowired
    private UserService userService;
    @Autowired
    private QuizService quizService;


    @Override
    public void saveRegisterQuiz(RegisterQuizDTO registerQuizDTO) throws UserNotFoundException, QuizNotFoundException {
        UserDTO user = userService.findOneUser(registerQuizDTO.getUser().getId());
        QuizDTO quiz = quizService.findOneQuiz(registerQuizDTO.getQuiz().getId());
        RegisterQuiz registerQuiz = registerQuizMapper.toEntity(registerQuizDTO);
        registerQuizRepository.save(registerQuiz);
    }

    @Override
    public RegisterQuizDTO findOneRegisterQuiz(Long id) throws RegisterQuizNotFoundException {
        Optional<RegisterQuiz> optionalRegisterQuiz = registerQuizRepository.findById(id);
        if (optionalRegisterQuiz.isEmpty())
            throw new RegisterQuizNotFoundException(REGISTER_QUIZ_NOT_FOUND_MESSAGE + id);
        RegisterQuiz registerQuiz = optionalRegisterQuiz.get();
        return registerQuizMapper.toDto(registerQuiz);
    }

    @Override
    public List<RegisterQuizDTO> findAllByQuiz(Long quizId) throws QuizNotFoundException {
        quizService.findOneQuiz(quizId);
        List<RegisterQuiz> registerQuizzes = registerQuizRepository.findAllByQuizId(quizId);
        return registerQuizMapper.toDto(registerQuizzes);
    }

    @Override
    public List<RegisterQuizDTO> findAllByUser(Long userId) throws UserNotFoundException {
        userService.findOneUser(userId);
        List<RegisterQuiz> registerQuizzes = registerQuizRepository.findAllByUserId(userId);
        return registerQuizMapper.toDto(registerQuizzes);
    }

    @Override
    public List<RegisterQuizDTO> findAllByUserAndQuiz(Long userId, Long quizId)
            throws UserNotFoundException, QuizNotFoundException {
        userService.findOneUser(userId);
        quizService.findOneQuiz(quizId);
        List<RegisterQuiz> registerQuizzes = registerQuizRepository.findAllByUserIdAndQuizId(userId, quizId);
        return registerQuizMapper.toDto(registerQuizzes);
    }

    @Override
    public List<RegisterQuizDTO> findAllByStatus(Boolean status) {
        List<RegisterQuiz> registerQuizzes = registerQuizRepository.findAllByStatus(status);
        return registerQuizMapper.toDto(registerQuizzes);
    }

    @Override
    public List<RegisterQuizDTO> findAllRegisterQuizzes() {
        List<RegisterQuiz> registerQuizzes = registerQuizRepository.findAll();
        return registerQuizMapper.toDto(registerQuizzes);
    }


}