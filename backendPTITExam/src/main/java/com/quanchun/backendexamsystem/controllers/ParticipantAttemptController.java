package com.quanchun.backendexamsystem.controllers;

import com.quanchun.backendexamsystem.dtos.ParticipantAttemptDTO;
import com.quanchun.backendexamsystem.error.ParticipantAttemptNotFoundException;
import com.quanchun.backendexamsystem.error.QuizNotFoundException;
import com.quanchun.backendexamsystem.error.RegisterQuizNotFoundException;
import com.quanchun.backendexamsystem.error.UserNotFoundException;
import com.quanchun.backendexamsystem.services.ParticipantAttemptService;
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
@RequestMapping("/api/participantAttempts")
public class ParticipantAttemptController {

    private Logger logger = LoggerFactory.getLogger(ParticipantAttemptController.class);

    @Autowired
    private ParticipantAttemptService participantAttemptService;

    @PostMapping
    public ResponseEntity<?> saveParticipantAttempt(@RequestBody ParticipantAttemptDTO participantAttemptDTO) {
        logger.info("Create new participant attempt");
        return new ResponseEntity<>(participantAttemptService.saveParticipantAttempt(participantAttemptDTO), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findOneParticipantAttempt(@PathVariable("id") Long id) {
        try {
            ParticipantAttemptDTO participantAttemptDTO = participantAttemptService.findOneParticipantAttempt(id);
            logger.info("Find participant attempt: {}", participantAttemptDTO.getId());
            return new ResponseEntity<>(participantAttemptDTO, HttpStatus.OK);
        }catch (ParticipantAttemptNotFoundException e){
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/registerQuiz/{id}")
    public ResponseEntity<?> findAllByRegisterQuiz(@PathVariable("id") Long id) {
        try {
            logger.info("Find all participant attempt by register quiz: {}", id);
            return new ResponseEntity<>( participantAttemptService.findAllByRegisterQuiz(id), HttpStatus.OK);
        }catch (RegisterQuizNotFoundException e){
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/quiz/{id}")
    public ResponseEntity<?> findAllByQuiz(@PathVariable("id") Long id) {
        try {
            logger.info("Find all participant attempt by quiz: {}", id);
            return new ResponseEntity<>( participantAttemptService.findAllByQuiz(id), HttpStatus.OK);
        }catch (QuizNotFoundException e){
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> findAllByUser(@PathVariable("id") Long id) {
        try {
            logger.info("Find all participant attempt by user: {}", id);
            return new ResponseEntity<>( participantAttemptService.findAllByUser(id), HttpStatus.OK);
        }catch (UserNotFoundException e){
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user_quiz/{userId}/{quizId}")
    public ResponseEntity<?> findAllByUserAndQuiz(@PathVariable("userId") Long userId,
                                                  @PathVariable("quizId") Long quizId) {
        try {
            logger.info("Find all participant attempt by user and quiz: {}, {}", userId, quizId);
            return new ResponseEntity<>( participantAttemptService.findAllByUserAndQuiz(userId,quizId), HttpStatus.OK);
        }catch (UserNotFoundException | QuizNotFoundException e){
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/")
    public ResponseEntity<Iterable<ParticipantAttemptDTO>> findAllParticipantAttempts() {
        logger.info("find all participant attempts");
        return new ResponseEntity<>(participantAttemptService.findAllParticipantAttempts(), HttpStatus.OK);
    }



}
