package com.quanchun.backendexamsystem.controllers;

import com.quanchun.backendexamsystem.dtos.QuizDTO;
import com.quanchun.backendexamsystem.error.QuizNotFoundException;
import com.quanchun.backendexamsystem.error.UserNotFoundException;
import com.quanchun.backendexamsystem.services.QuizService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {
    private final Logger logger = LoggerFactory.getLogger(QuizController.class);

    @Autowired
    private QuizService quizService;

    @GetMapping("/")
    public ResponseEntity<?> findAllQuizzes() {
        logger.info("Find all quizzes");
        return new ResponseEntity<>(quizService.findAllQuizzes(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findOneQuiz(@PathVariable("id") Long id) {
        try {
            QuizDTO quizDTO = quizService.findOneQuiz(id);
            logger.info("Find quiz: {}", quizDTO.getId());
            return new ResponseEntity<>(quizDTO, HttpStatus.OK);
        } catch (QuizNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/host/{id}")
    public ResponseEntity<?> findAllByHostId(@PathVariable("id") Long id) {
        try {
            logger.info("Find all quiz by host: {}", id);
            return new ResponseEntity<>(quizService.findAllByHost(id), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> saveQuiz(@RequestBody QuizDTO quizDTO) {
        try {
            QuizDTO oldQuizDTO = quizService.findOneQuiz(quizDTO.getId());
            if (quizDTO.getQuestionList().isEmpty()) {
                quizDTO.setQuestionList(oldQuizDTO.getQuestionList());
            }
            logger.info("Update quiz: {}", oldQuizDTO.getId());
        } catch (QuizNotFoundException e) {
            logger.info("Create new quiz");
        }
        quizService.saveQuiz(quizDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuiz(@PathVariable("id") Long id) {
        try {
            quizService.delete(id);
            logger.info("Delete quiz: {}", id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (QuizNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }


}
