package com.quanchun.backendexamsystem;

import com.quanchun.backendexamsystem.models.*;
import com.quanchun.backendexamsystem.models.participant.ParticipantAnswer;
import com.quanchun.backendexamsystem.models.participant.ParticipantAttempt;
import com.quanchun.backendexamsystem.repositories.*;
import com.quanchun.backendexamsystem.security.models.Account;
import com.quanchun.backendexamsystem.security.models.Role;
import com.quanchun.backendexamsystem.security.repositories.AccountRepository;
import com.quanchun.backendexamsystem.security.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Set;

@SpringBootApplication
public class BackendExamSystemApplication implements CommandLineRunner {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    OptionAnswerRepository optionAnswerRepository;

    @Autowired
    QuizRepository quizRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    RegisterQuizRepository registerQuizRepository;
    @Autowired
    private ParticipantAttemptRepository participantAttemptRepository;


    public static void main(String[] args) {
        SpringApplication.run(BackendExamSystemApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
//        initDB();
    }


    public void initDB() {
        // Init Role
        Role roleAdmin = Role.builder().name("ROLE_ADMIN").build();
        Role roleUser = Role.builder().name("ROLE_USER").build();
        roleAdmin = roleRepository.save(roleAdmin);
        roleUser = roleRepository.save(roleUser);


        Set<Role> adminRole = Set.of(roleAdmin, roleUser);
        Set<Role> userRole = Set.of(roleUser);

        // Init Account
        Account account1 = Account.builder()
                                  .id(1L)
                                  .email("ngtung140603@gmail.com")
                                  .status("active")
                                  .username("admin1")
                                  .password(passwordEncoder.encode("123"))
                                  .roles(adminRole).build();
        account1 = accountRepository.save(account1);

        Account account2 = Account.builder().id(2L).email("ngduong140603@gmail.com")
                                  .username("admin2")
                                  .status("active")
                                  .password(passwordEncoder.encode(
                                          "123")).roles(adminRole).build();
        account2 = accountRepository.save(account2);


        Account account3 = Account.builder().id(3L).email("ngxuan140603@gmail.com")
                                  .username("admin3")
                                  .status("active")
                                  .password(passwordEncoder.encode(
                                          "123")).roles(adminRole).build();
        account3 = accountRepository.save(account3);


        Account account4 = Account.builder().id(4L).email("nghuy140603@gmail.com")
                                  .username("admin4")
                                  .status("block")
                                  .password(passwordEncoder.encode(
                                          "123")).roles(adminRole).build();
        account4 = accountRepository.save(account4);


        // Init User
        String dobStr = "2002-03-31";
        User userAdmin = User.builder().account(account1)
                             .fullName("Nguyen Van Tung")
                             .address("Ha Dong")
                             .gender(true)
                             .imageUrl(null)
                             .phone("0123456789")
                             .dob(Date.valueOf(dobStr)).build();
        userAdmin = userRepository.save(userAdmin);

        User userAdmin2 = User.builder().account(account2)
                              .fullName("Nguyen Tuan Duong")
                              .address("Ha Dong")
                              .gender(true)
                              .imageUrl(null)
                              .phone("0123456789")
                              .dob(Date.valueOf(dobStr)).build();
        userAdmin2 = userRepository.save(userAdmin2);

        User userAdmin3 = User.builder().account(account3)
                              .fullName("Nguyen Van Xuan")
                              .address("Ha Dong")
                              .gender(true)
                              .imageUrl(null)
                              .phone("0123456789")
                              .dob(Date.valueOf(dobStr)).build();
        userAdmin3 = userRepository.save(userAdmin3);

        User userAdmin4 = User.builder().account(account4)
                              .fullName("Nguyen Anh Huy")
                              .address("Ha Dong")
                              .gender(true)
                              .imageUrl(null)
                              .phone("0123456789")
                              .dob(Date.valueOf(dobStr)).build();
        userAdmin4 = userRepository.save(userAdmin4);

        String[] studyClasses = {"01", "02"};
        String[] addresses = {"Ha Dong", "Ba Dinh", "Hoan Kiem", "Tay Ho", "Cau Giay"};
        String[] fullNamePrefixes = {"Nguyen Van", "Nguyen Bui", "Nguyen Duc", "Tran Van", "Le Van"};


        Random random = new Random();


        for (int i = 1; i <= 50; i++) {
            Account account = Account.builder()
                                     .id((long) (i + 4))
                                     .username("user" + i)
                                     .status("active")
                                     .email(null)
                                     .password(passwordEncoder.encode("123"))
                                     .roles(userRole)
                                     .build();
            account = accountRepository.save(account);


            String fullName = fullNamePrefixes[random.nextInt(fullNamePrefixes.length)] + " " + i;
            String studyClass = studyClasses[random.nextInt(studyClasses.length)];
            String address = addresses[random.nextInt(addresses.length)];
            boolean gender = random.nextBoolean();
            String phone = "0123456789";
            Date dob = Date.valueOf(dobStr);

            User user = User.builder()
                            .fullName(fullName)
                            .studyClass(studyClass)
                            .address(address)
                            .gender(gender)
                            .imageUrl(null)
                            .phone(phone)
                            .dob(dob)
                            .account(account)
                            .build();
            userRepository.save(user);
        }

        // Init quiz
        String[] subjects = {"Anh", "Toán", "Lịch Sử", "Văn"};
        String createStr = "2002-03-31";
        String startStr = "2024-05-20";
        String endStr = "2024-05-24";


        for (int i = 1; i <= 100; i++) {
            String subject = subjects[random.nextInt(subjects.length)];
            String quizTitle = "Bài kiểm tra " + subject.toLowerCase();
            User teacher = userRepository.findById((long) (random.nextInt(4) + 1)).get(); // giả sử có 4 giáo viên,
            // ID từ 1 đến 4
            String description = "A quiz about general " + subject.toLowerCase() + " knowledge.";
            int difficulty = random.nextInt(5) + 1; // độ khó từ 1 đến 5

            Quiz quiz = generateQuiz(quizTitle, teacher, description, subject, difficulty,
                                     Date.valueOf(createStr), Date.valueOf(startStr), Date.valueOf(endStr));
            quizRepository.save(quiz);
        }

        String startTimeStr = "2024-05-20";
        String endTimeStr = "2024-05-24";

        List<User> users = userRepository.findAll();
        List<Quiz> quizzes = quizRepository.findAll();

        // Ensure that there are enough users and quizzes
        if (users.size() < 50 || quizzes.size() < 4) {
            System.out.println("Not enough users or quizzes to proceed.");
            return;
        }

        // Create 100 register quiz records
        for (int i = 0; i < 100; i++) {
            User user = users.get(random.nextInt(users.size()));
            Quiz quiz = quizzes.get(random.nextInt(quizzes.size()));
            Boolean status = random.nextBoolean();
            Date startTime = Date.valueOf(startTimeStr);
            Date endTime = Date.valueOf(endTimeStr);

            RegisterQuiz registerQuiz = RegisterQuiz.builder()
                                                    .user(user)
                                                    .quiz(quiz)
                                                    .status(status)
                                                    .startTime(startTime)
                                                    .endTime(endTime)
                                                    .build();

            registerQuizRepository.save(registerQuiz);
        }

        String finishTimeStr = "2024-05-24";


        List<RegisterQuiz> registerQuizzes = registerQuizRepository.findAll();

        // Ensure that there are enough register quizzes
        if (registerQuizzes.size() < 100) {
            System.out.println("Not enough register quizzes to proceed.");
            return;
        }

        // Create 100 participant attempt records
        for (int i = 0; i < 100; i++) {
            RegisterQuiz registerQuiz = registerQuizzes.get(random.nextInt(registerQuizzes.size()));
            Quiz quiz = registerQuiz.getQuiz();
            List<Question> questions = quiz.getQuestionList();
            int correctAnswersCount = 0;

            // Create participant attempt
            ParticipantAttempt participantAttempt = ParticipantAttempt.builder()
                                                                      .registerQuiz(registerQuiz)
                                                                      .beginTime(Date.valueOf(startTimeStr))
                                                                      .finishTime(Date.valueOf(finishTimeStr))
                                                                      .participantAnswerList(new ArrayList<>())
                                                                      .score(0.0)
                                                                      .build();

            participantAttempt = participantAttemptRepository.save(participantAttempt);

            // Create participant answers for each question
            for (Question question : questions) {
                List<OptionAnswer> options = question.getOptionAnswerList();
                OptionAnswer selectedOption = options.get(random.nextInt(options.size()));
                boolean isCorrect = selectedOption.getId().equals(question.getCorrectOptionAnswer());

                if (isCorrect) {
                    correctAnswersCount++;
                }

                ParticipantAnswer participantAnswer = ParticipantAnswer.builder()
                                                                       .questionId(question.getId())
                                                                       .participantAttemptId(participantAttempt.getId())
                                                                       .userOptionAnswerId(selectedOption.getId())
                                                                       .build();
                participantAttempt.getParticipantAnswerList().add(participantAnswer);
            }

            // Calculate score
            double score = (double) correctAnswersCount / questions.size() * 10;

            // Set score and correct answers count
            participantAttempt.setScore(score);
            participantAttempt.setCorrectAnswers(correctAnswersCount);

            participantAttemptRepository.save(participantAttempt);
        }
    }

    private Quiz generateQuiz(String title, User teacher, String description, String subject, int difficulty,
                              Date createdAt,
                              Date startedAt, Date endedAt) {
        Random random = new Random();
        Quiz quiz = new Quiz();
        quiz.setUser(teacher);
        quiz.setTitle(title);
        quiz.setDescription(description);
        quiz.setType(1);
        quiz.setDifficulty(difficulty);
        quiz.setSubject(subject);
        quiz.setCreatedAt(createdAt);
        quiz.setStartedAt(startedAt);
        quiz.setEndedAt(endedAt);
        quiz.setStatus(0);
        quiz.setDuration(60);

        List<Question> questions = new ArrayList<>();

        for (int i = 1; i <= 10; i++) {
            Question question = new Question();
            question.setQuestionTitle(subject + " câu hỏi " + i);
            question.setDifficulty(difficulty);
            question.setCategory("Nhập môn " + subject);

            List<OptionAnswer> options = new ArrayList<>();
            for (int j = 1; j <= 4; j++) {
                OptionAnswer option = new OptionAnswer();
                option.setOptionAnswerTitle("Đáp án " + j);
                options.add(option);
            }

            // Save the options to generate IDs
            options = optionAnswerRepository.saveAll(options);

            // Set the options to the question
            question.setOptionAnswerList(options);

            // Set correct answer ID randomly
            int correctAnswerIndex = random.nextInt(options.size());
            question.setCorrectOptionAnswer(options.get(correctAnswerIndex).getId());

            questions.add(question);
        }

        quiz.setQuestionList(questions);

        return quiz;
    }

}
