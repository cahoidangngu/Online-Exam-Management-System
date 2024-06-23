package com.quanchun.backendexamsystem.controllers;


import com.quanchun.backendexamsystem.dtos.ParticipantAnswerDTO;
import com.quanchun.backendexamsystem.error.ParticipantAttemptNotFoundException;
import com.quanchun.backendexamsystem.error.RegisterQuizNotFoundException;
import com.quanchun.backendexamsystem.services.ParticipantAnswerService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/participantAnswer")
public class ParticipantAnswerController {

    private Logger logger = LoggerFactory.getLogger(ParticipantAnswerController.class);

    @Autowired
    private ParticipantAnswerService participantAnswerService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/")
    public ResponseEntity<Iterable<ParticipantAnswerDTO>> findAllParticipantAnswers() {
        logger.info("Find all participant answers");
        return new ResponseEntity<>(participantAnswerService.findAllParticipantAnswers(), HttpStatus.OK);
    }

    @GetMapping("/participantAttempt/{id}")
    public ResponseEntity<?> findAllByParticipantAttempt(@PathVariable("id") Long id) {
        try {
            logger.info("Find all participant answer by participant attempt: {}", id);
            return new ResponseEntity<>( participantAnswerService.findAllByParticipantAttempt(id), HttpStatus.OK);
        }catch (ParticipantAttemptNotFoundException e){
            logger.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
