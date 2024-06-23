import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "./QuestionCard";
import "./StudentResultModal.css";

const modalVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const StudentResultModal = ({ participantAttempt, onClose, isVisible }) => {
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
                  {participantAttempt.registerQuiz.quiz.subject}
                </h1>
              </div>
              <div class="modal-body">
                <div class="container-fluid">
                  <div class="row mt-4 gap-2">
                    <div class="left-side col-8 exam-content">
                      {participantAttempt.participantAnswerList.length === 0 ? (
                        <h1>Đang tải</h1>
                      ) : (
                        participantAttempt.participantAnswerList.map(
                          (participantAnswer, index) => (
                            <QuestionCard
                              key={index}
                              participantAnswer={participantAnswer}
                              participantAnswerIndex={index}
                            />
                          )
                        )
                      )}
                    </div>
                    <div class="col right-side px-0">
                      <div class="d-flex flex-column gap-3">
                        <div class="card text-center px-3 py-4">
                          <div class="input-group mb-3">
                            <span
                              class="input-group-text"
                              id="inputGroup-exam-title"
                            >
                              Điểm:
                            </span>
                            <input
                              type="text"
                              class="form-control"
                              aria-label="exam title"
                              aria-describedby="inputGroup-exam-title"
                              value={participantAttempt.score}
                              readOnly
                            />
                          </div>
                          <div class="input-group">
                            <span
                              class="input-group-text"
                              id="inputGroup-exam-taking"
                            >
                              Số câu đúng:
                            </span>
                            <input
                              type="text"
                              class="form-control"
                              aria-label="time taking"
                              aria-describedby="inputGroup-exam-taking"
                              value={participantAttempt.correctAnswers}
                              readOnly
                            />
                          </div>
                          <div class="input-group">
                            <span
                              class="input-group-text"
                              id="inputGroup-exam-taking"
                            >
                              Thời gian bắt đầu:
                            </span>
                            <input
                              type="text"
                              class="form-control"
                              aria-label="time taking"
                              aria-describedby="inputGroup-exam-taking"
                              value={participantAttempt.beginTime}
                              readOnly
                            />
                          </div>
                          <div class="input-group">
                            <span
                              class="input-group-text"
                              id="inputGroup-exam-taking"
                            >
                              Thời gian nộp bài:
                            </span>
                            <input
                              type="text"
                              class="form-control"
                              aria-label="time taking"
                              aria-describedby="inputGroup-exam-taking"
                              value={participantAttempt.finishTime}
                              readOnly
                            />
                          </div>
                          <div class="card table-question-card">
                            <div class="card-body">
                              <h2 class="card-title text-center">Câu hỏi</h2>
                              <div class="table-question">
                                {participantAttempt.participantAnswerList.map(
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

export default StudentResultModal;
