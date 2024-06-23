package com.quanchun.backendexamsystem.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "register_quiz")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class RegisterQuiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Quiz quiz;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private Boolean status;

    private Date startTime;

    private Date endTime;
}