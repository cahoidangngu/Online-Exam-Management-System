package com.quanchun.backendexamsystem.controllers;

import com.quanchun.backendexamsystem.dtos.QuestionDTO;
import com.quanchun.backendexamsystem.error.ParticipantAttemptNotFoundException;
import com.quanchun.backendexamsystem.error.QuestionNotFoundException;
import com.quanchun.backendexamsystem.error.QuizNotFoundException;
import com.quanchun.backendexamsystem.error.RegisterQuizNotFoundException;
import com.quanchun.backendexamsystem.services.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private Logger logger = LoggerFactory.getLogger(QuestionController.class);

    @Autowired
    private QuestionService questionService;

    @GetMapping("/{id}")
    public ResponseEntity<?> findOneQuestion(@PathVariable("id") Long id) {
        try {
            QuestionDTO questionDTO = questionService.findOneQuestion(id);
            logger.info("Find question: {}", questionDTO.getId());
            return new ResponseEntity<>(questionDTO, HttpStatus.OK);
        } catch (QuestionNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/quiz/{id}")
    public ResponseEntity<?> findAllByQuiz(@PathVariable("id") Long id) {
        try {
            logger.info("Find all question by quiz: {}", id);
            return new ResponseEntity<>(questionService.findAllByQuiz(id), HttpStatus.OK);
        } catch (QuizNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/registerQuiz/{id}")
    public ResponseEntity<?> findAllByRegisterQuiz(@PathVariable("id") Long id) {
        try {
            logger.info("Find all question by register quiz: {}", id);
            return new ResponseEntity<>(questionService.findAllByRegisterQuiz(id), HttpStatus.OK);
        } catch (RegisterQuizNotFoundException | QuizNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/participantAttempt/{id}")
    public ResponseEntity<?> findAllByParticipantAttempt(@PathVariable("id") Long id) {
        try {
            logger.info("Find all question by participant attempt: {}", id);
            return new ResponseEntity<>(questionService.findAllByParticipantAttempt(id), HttpStatus.OK);
        } catch (ParticipantAttemptNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/")
    public ResponseEntity<?> findAllQuestions() {
        logger.info("Find all questions");
        return new ResponseEntity<>(questionService.findAllQuestions(), HttpStatus.OK);
    }


}
