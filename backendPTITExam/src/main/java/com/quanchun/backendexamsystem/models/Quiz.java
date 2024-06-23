package com.quanchun.backendexamsystem.models;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "quiz")
@Builder
@ToString
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    private String title;
    private String description;
    private Integer type;
    private Integer difficulty;
    private String subject;
    private Date createdAt;
    private Date startedAt;
    private Date endedAt;
    private Integer status = 0;
    private Integer duration;

    @ManyToMany(
            fetch = FetchType.EAGER,
            cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH}
    )
    @JoinTable(
            name = "quizzes_questions",
            joinColumns = @JoinColumn(
                    name = "quiz_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "question_id", referencedColumnName = "id")
    )
    private List<Question> questionList;

}
