import React, { useEffect, useState } from "react";
import QuestionCard from "../../../components/student/QuizTaking/QuestionCard";
import Countdown from "../../../components/student/QuizTaking/CountDown";
import "./QuizTaking.css";
import formatedDate from "../../../config/formatedDate";
import { saveParticipantAttempt } from "../../../services/participantAttemptServices";

const newParticipantAttempt = {
  id: 0,
  registerQuiz: {
    id: 1,
  },
  score: 0,
  correctAnswers: 0,
  beginTime: formatedDate(new Date()),
  finishTime: "2024-06-08T09:52:07.704Z",
  participantAnswerList: [],
};

const newParticipantAnswer = {
  questionId: 50,
  participantAttemptId: 0,
  userOptionAnswerId: 0,
};

const QuizTaking = () => {
  const [participantAttemptState, setSelectedParticipantAttemptState] =
    useState(newParticipantAttempt);
  const [questions, setQuestions] = useState(examsList[0].questionList);

  const onSubmitHandler = async () => {
    const participantAttempt = await saveParticipantAttempt(
      participantAttemptState
    );
  };

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      document.querySelector(".exam-content").style.maxHeight = `${
        windowHeight - navbarHeight * 2
      }px`;
      document.querySelector(".right-side").style.maxHeight = `${
        windowHeight - navbarHeight * 2
      }px`;
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="main-section">
      <div className="mx-5">
        <div className="row mt-4 gap-5">
          <div className="col-8 exam-content">
            <div className="exam-header text-center">
              <h1 className="exam-title">{participantAttemptState.examTitle}</h1>
              <h4 className="exam-time">{participantAttemptState.minuteTaking} phút</h4>
            </div>
            {questions.map((question, index) => (
              <QuestionCard key={index} question={question} index={index} />
            ))}
            <div className="exam-footer text-center">
              <h4>Kết thúc bài kiểm tra!</h4>
              <p>Vui lòng kiểm tra lại đáp án</p>
            </div>
          </div>
          <div className="col right-side px-0">
            <div className="d-flex flex-column gap-5">
              <Countdown time={participantAttemptState.minuteTaking} />
              <div className="card table-question-card">
                <div className="card-body">
                  <h2 className="card-title text-center">
                    Đề: {participantAttemptState.examTitle}
                  </h2>
                  <p className="card-text text-center">
                    Số câu:{" "}
                    <span className="numbers-question">
                      0/{questions.length}
                    </span>
                  </p>
                  <div className="table-question">
                    {questions.map((_, index) => (
                      <a
                        key={index}
                        className="table-question-item"
                        href={`#${0}-${index}`}
                      >
                        {index + 1}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <button
                id="submit-btn"
                className="submit-card card align-self-center text-center"
                onClick={onSubmitHandler}
              >
                <div className="w-100 submit-btn">
                  <h4>Submit</h4>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizTaking;
