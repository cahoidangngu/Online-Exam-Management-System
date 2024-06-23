package com.quanchun.backendexamsystem.controllers;

import com.quanchun.backendexamsystem.dtos.RegisterQuizDTO;
import com.quanchun.backendexamsystem.error.QuizNotFoundException;
import com.quanchun.backendexamsystem.error.RegisterQuizNotFoundException;
import com.quanchun.backendexamsystem.error.UserNotFoundException;
import com.quanchun.backendexamsystem.services.RegisterQuizService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/registerQuizzes")
public class RegisterQuizController {
    @Autowired
    private RegisterQuizService registerQuizService;

    private Logger logger = LoggerFactory.getLogger(RegisterQuizController.class);


    @GetMapping("/{id}")
    public ResponseEntity<?> findOneRegisterQuiz(@PathVariable("id") Long id) {
        try {
            RegisterQuizDTO registerQuizDTO = registerQuizService.findOneRegisterQuiz(id);
            logger.info("Find register quiz: {}", registerQuizDTO.getId());
            return new ResponseEntity<>(registerQuizDTO, HttpStatus.OK);
        } catch (RegisterQuizNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/quiz/{id}")
    public ResponseEntity<?> findAllByQuiz(@PathVariable("id") Long id) {
        try {
            logger.info("Find all register quiz by quiz: {}", id);
            return new ResponseEntity<>(registerQuizService.findAllByQuiz(id), HttpStatus.OK);
        } catch (QuizNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> findAllByUser(@PathVariable("id") Long id) {
        try {
            logger.info("Find all register quiz by user: {}", id);
            return new ResponseEntity<>(registerQuizService.findAllByUser(id), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user_quiz/{userId}/{quizId}")
    public ResponseEntity<?> findAllByUserAndQuiz(@PathVariable("userId") Long userId,
                                                  @PathVariable("quizId") Long quizId) {
        try {
            logger.info("Find all register quiz by user and quiz: {}, {}", userId, quizId);
            return new ResponseEntity<>(registerQuizService.findAllByUserAndQuiz(userId, quizId), HttpStatus.OK);
        } catch (UserNotFoundException | QuizNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<?> findAllByStatus(@PathVariable("status") Boolean status) {
        logger.info("Find all register quiz by status: {}", status);
        return new ResponseEntity<>(registerQuizService.findAllByStatus(status), HttpStatus.OK);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/")
    public ResponseEntity<?> findAllRegisterQuizzes() {
        logger.info("Find all register quizzes");
        return new ResponseEntity<>(registerQuizService.findAllRegisterQuizzes(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> saveRegisterQuiz(@RequestBody RegisterQuizDTO registerQuizDTO) {
        try {
            try {
                RegisterQuizDTO oldRegisterQuizDTO = registerQuizService.findOneRegisterQuiz(registerQuizDTO.getId());
                logger.info("Update register quiz: {}", oldRegisterQuizDTO.getId());
            } catch (RegisterQuizNotFoundException e) {
                logger.info("Create new register quiz");
                registerQuizDTO.setStatus(Boolean.TRUE);
            }
            registerQuizService.saveRegisterQuiz(registerQuizDTO);
        } catch (UserNotFoundException | QuizNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
