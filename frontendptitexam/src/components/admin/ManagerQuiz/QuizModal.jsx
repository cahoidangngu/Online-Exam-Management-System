import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "./QuestionCard";
import "./QuizModal.css";
import { saveQuiz } from "../../../services/quizServices";

const modalVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const QuizModal = ({ quiz, onClose, isVisible, onUpdateSuccess }) => {
  const [quizState, setQuizState] = useState(quiz);

  const convertFromCorrecOptionAnswerIdToIndex = () => {
    let converQuestionList = [...quizState.questionList];
    for (let i = 0; i < converQuestionList.length; i++) {
      let correctOptionAnswerIndex = 0;
      let question = converQuestionList[i];
      question.optionAnswerList.forEach((optionAnswer, idx) => {
        if (optionAnswer.id === question.correctOptionAnswer) {
          correctOptionAnswerIndex = idx;
        }
      });
      const convertQuestion = {
        ...question,
        correctOptionAnswer: correctOptionAnswerIndex,
      };
      converQuestionList[i] = convertQuestion;
    }
    return { ...quizState, questionList: converQuestionList };
  };

  const handleTitleChange = (event) => {
    setQuizState({ ...quizState, title: event.target.value });
  };
  const handleDurationChange = (event) => {
    setQuizState({ ...quizState, duration: event.target.value });
  };
  const handleTypeChange = (event) => {
    setQuizState({ ...quizState, type: event.target.value });
  };

  const handleUpdateQuiz = async () => {
    try {
      const convertQuiz = convertFromCorrecOptionAnswerIdToIndex();
      const response = await saveQuiz(convertQuiz);
      if (response.status === 200) {
        onUpdateSuccess("success", "Bài kiểm tra đã được cập nhật thành công."); // Invoke the callback on successful deletion
      } else {
        throw new Error("Failed to update the quiz.");
      }
    } catch (error) {
      onUpdateSuccess(
        "error",
        "Có lỗi xảy ra, không thể cập nhật bài kiểm tra: \n" + error.message
      );
    }
  };

  const handleQuestionAdd = () => {
    const newQuestion = {
      id: 0, // Generate new id for the question
      questionTitle: "",
      difficulty: quizState.difficulty,
      correctOptionAnswer: null,
      category: quizState.subject,
      optionAnswerList: [],
    };
    const updatedQuestions = [...quizState.questionList, newQuestion];
    setQuizState({ ...quizState, questionList: updatedQuestions });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          transition={{ duration: 0.3 }}
          className="modal fade show"
          style={{ display: "block" }}
          aria-modal="true"
          role="dialog"
          onClick={onClose} // To close modal on outside click
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {quizState.subject}
                </h1>
              </div>
              <div class="modal-body">
                <div class="container-fluid">
                  <div class="row mt-4 gap-2">
                    <div class="left-side col-8 exam-content">
                      {quizState.questionList.length === 0 ? (
                        <h1>Chưa có câu hỏi</h1>
                      ) : (
                        quizState.questionList.map((questionData, index) => (
                          <QuestionCard
                            key={index}
                            questionData={questionData}
                            questionIndex={index}
                            setQuiz={setQuizState}
                            quiz={quizState}
                          />
                        ))
                      )}
                      <div class="d-grid gap-2 add-question-item-section">
                        <button
                          class="btn btn-primary add-question-item-btn"
                          type="button"
                          onClick={handleQuestionAdd}
                        >
                          <i class="bx bx-plus"></i> Thêm câu câu hỏi
                        </button>
                      </div>
                    </div>
                    <div class="col right-side px-0">
                      <div class="d-flex flex-column gap-3">
                        <div class="card text-center px-3 py-4">
                          <div class="input-group mb-3">
                            <span
                              class="input-group-text"
                              id="inputGroup-exam-title"
                            >
                              Tiêu đề:
                            </span>
                            <input
                              type="text"
                              class="form-control"
                              aria-label="exam title"
                              aria-describedby="inputGroup-exam-title"
                              value={quizState.title}
                              onChange={handleTitleChange}
                            />
                          </div>
                          <div class="input-group">
                            <span
                              class="input-group-text"
                              id="inputGroup-exam-taking"
                            >
                              Thời gian:
                            </span>
                            <input
                              type="text"
                              class="form-control"
                              aria-label="time taking"
                              aria-describedby="inputGroup-exam-taking"
                              value={quizState.duration}
                              onChange={handleDurationChange}
                            />
                          </div>
                          <div className="table-filter-item filter-exam-type mb-3">
                            <p className="table-filter-label form-label">
                              Loại kỳ thi:
                            </p>

                            <div className="form-check form-check-inline">
                              <input
                                defaultChecked={quizState.type === 1}
                                className="form-check-input"
                                type="radio"
                                name="examTypeEdit"
                                id="allTimeEdit"
                                value={1}
                                onClick={handleTypeChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="allTimeEdit"
                              >
                                Tự do
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                defaultChecked={quizState.type === 0}
                                className="form-check-input"
                                type="radio"
                                name="examTypeEdit"
                                id="timeRestrictEdit"
                                value={0}
                                onClick={handleTypeChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="timeRestrictEdit"
                              >
                                Giới hạn
                              </label>
                            </div>
                          </div>
                          <div class="card table-question-card">
                            <div class="card-body">
                              <h2 class="card-title text-center">Câu hỏi</h2>
                              <div class="table-question">
                                {quizState.questionList.map(
                                  (_, questionIndex) => (
                                    <a
                                      key={questionIndex}
                                      class="table-question-item"
                                      href={`#list-item-${questionIndex}`}
                                    >
                                      {questionIndex + 1}
                                    </a>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          <div class="pt-3 d-grid gap-2 col-6 mx-auto">
                            <button
                              class="btn btn-primary save-btn"
                              type="button"
                              onClick={handleUpdateQuiz}
                            >
                              Lưu bài
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuizModal;
