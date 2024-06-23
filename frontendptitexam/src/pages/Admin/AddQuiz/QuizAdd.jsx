import React, { useEffect, useState } from "react";
import QuestionCard from "../../../components/admin/ManagerQuiz/QuestionCard";
import "./QuizAdd.css";
import { Snackbar, Alert } from "@mui/material";
import * as XLSX from "xlsx";
import formatedDate from "../../../config/formatedDate";
import { saveQuiz } from "../../../services/quizServices";

const newQuiz = {
  id: 0,
  hostId: 0,
  title: "",
  description: "",
  type: 1,
  difficulty: 0,
  subject: "",
  createdAt: "",
  startedAt: "",
  endedAt: "",
  status: 0,
  duration: 60,
  questionList: [],
};

const newQuestion = {
  id: 0,
  questionTitle: "",
  difficulty: 1,
  correctOptionAnswer: null,
  category: null,
  optionAnswerList: [],
};

const QuizAdd = () => {
  const [quizState, setQuizState] = useState(newQuiz);
  const [isQuestionListSet, setIsQuestionListSet] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarStatus, setSnackbarStatus] = useState("success");

  useEffect(() => {
    // Thiết lập các thuộc tính cơ bản của quiz khi khởi tạo
    let hostId = 2; // Lấy ID từ localStorage hoặc đặt cứng tùy thuộc vào yêu cầu
    let createdAt = formatedDate(new Date());
    setQuizState((prevState) => ({
      ...prevState,
      hostId: hostId,
      createdAt: createdAt,
    }));
  }, []);

  useEffect(() => {
    // Theo dõi sự thay đổi của quizState để kiểm tra xem questionList đã được set chưa
    if (quizState.questionList.length > 0) {
      setIsQuestionListSet(true);
      console.log(quizState);
    } else {
      setIsQuestionListSet(false);
    }
  }, [quizState.questionList]);

  const handleTitleChange = (event) => {
    setQuizState({ ...quizState, title: event.target.value });
  };
  const handleDurationChange = (event) => {
    setQuizState({ ...quizState, duration: event.target.value });
  };
  const handleTypeChange = (event) => {
    setQuizState({ ...quizState, type: event.target.value });
  };

  const fillAllQuestionAttributeSyncronizeWithQuiz = () => {
    let fillQuestionList = [...quizState.questionList];
    let difficulty = quizState.difficulty;
    let category = quizState.subject;
    for (let i = 0; i < fillQuestionList.length; i++) {
      let question = fillQuestionList[i];
      const fillQuestion = {
        ...question,
        difficulty: difficulty,
        category: category,
      };
      fillQuestionList[i] = fillQuestion;
    }
    return { ...quizState, questionList: fillQuestionList };
  };

  const handleAddQuestion = () => {
    const updatedQuestions = [...quizState.questionList, newQuestion];
    setQuizState({ ...quizState, questionList: updatedQuestions });
  };

  const handleSaveQuiz = async () => {
    try {
      const quiz = fillAllQuestionAttributeSyncronizeWithQuiz();
      const response = await saveQuiz(quiz);
      if (response.status === 200) {
        setSnackbarMessage("Bài kiểm tra đã được lưu.");
        setSnackbarStatus("success");
        setSnackbarOpen(true);
      } else {
        throw new Error("Failed to update the quiz.");
      }
    } catch (error) {
      setSnackbarMessage("Bài kiểm tra chưa được lưu.");
      setSnackbarStatus("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const questions = jsonData.slice(1).map((row) => ({
        id: 0,
        questionTitle: row[4],
        correctOptionAnswer: row[5],
        optionAnswerList: [
          {
            id: 0,
            optionAnswerTitle: row[0],
          },
          {
            id: 0,
            optionAnswerTitle: row[1],
          },
          {
            id: 0,
            optionAnswerTitle: row[2],
          },
          {
            id: 0,
            optionAnswerTitle: row[3],
          },
        ],
        difficulty: 1,
        category: null,
      }));
      const updatedQuestions = [...quizState.questionList, questions];
      setQuizState({ ...quizState, questionList: updatedQuestions });
    };

    reader.readAsArrayBuffer(file);
  };

  const generateSampleExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([
      {
        questionTitle: "Câu hỏi",
        correctOptionAnswer: "Đáp án đúng",
        0: "Đáp án 0",
        1: "Đáp án 1",
        2: "Đáp án 2",
        3: "Đáp án 3",
      },
    ]);
    XLSX.utils.book_append_sheet(wb, ws, "Mẫu câu hỏi");
    XLSX.writeFile(wb, "MauCauHoi.xlsx");
  };
  if (quizState === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-content">
      <h2 className="main-content-head">Tạo bài kiểm tra</h2>
      <div className="main-content-body">
        <div className="container-fluid">
          <div className="row mt-4 gap-2">
            <div className="left-side col-8 exam-content">
              {!isQuestionListSet ? (
                <div>Loading questions...</div>
              ) : quizState === null ? (
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
              <div className="d-grid gap-2 add-question-section">
                <button
                  className="btn btn-primary add-question-btn"
                  type="button"
                  onClick={handleAddQuestion}
                >
                  <i className="bx bx-plus"></i> Thêm câu hỏi
                </button>
              </div>
            </div>
            <div className="col right-side px-0">
              <div className="d-flex flex-column gap-3">
                <div className="card text-center px-3 py-4">
                  <div className="input-group mb-2">
                    <span
                      className="input-group-text"
                      id="inputGroup-exam-title"
                    >
                      Tiêu đề:
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="exam title"
                      aria-describedby="inputGroup-exam-title"
                      value={quizState === null ? "" : quizState.title}
                      onChange={handleTitleChange}
                    />
                  </div>
                  <div className="input-group">
                    <span
                      className="input-group-text"
                      id="inputGroup-exam-taking"
                    >
                      Thời gian:
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="time taking"
                      aria-describedby="inputGroup-exam-taking"
                      value={quizState === null ? "" : quizState.duration}
                      onChange={handleDurationChange}
                      min={15}
                    />
                  </div>
                  <div className="input-exam-type">
                    <p className="table-filter-label form-label">
                      Loại kỳ thi:
                    </p>
                    <div className="form-check form-check-inline">
                      <input
                        defaultChecked={
                          quizState === null ? "" : quizState.type === 1
                        }
                        className="form-check-input"
                        type="radio"
                        name="examTypeEdit"
                        id="allTimeEdit"
                        value={1}
                        onClick={handleTypeChange}
                      />
                      <label className="form-check-label" htmlFor="allTimeEdit">
                        Tự do
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        defaultChecked={
                          quizState === null ? "" : quizState.type === 0
                        }
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
                </div>
                <div className="card table-question-card">
                  <div className="card-body">
                    <h2 className="card-title text-center">Số câu hỏi</h2>
                    <div class="table-question">
                      {quizState === null ? (
                        <h3>Chưa có câu hỏi</h3>
                      ) : (
                        quizState.questionList.map((_, questionIndex) => (
                          <a
                            key={questionIndex}
                            class="table-question-item"
                            href={`#list-item-${questionIndex}`}
                          >
                            {questionIndex + 1}
                          </a>
                        ))
                      )}
                    </div>
                  </div>
                </div>
                <div className="card text-center px-3 py-4">
                  <div className="input-group">
                    <input
                      accept=".xlsx, .xls"
                      type="file"
                      className="form-control"
                      id="fileInput"
                      onChange={handleFileUpload}
                    />
                    <label className="input-group-text" htmlFor="fileInput">
                      Tải lên excel
                    </label>
                  </div>
                  <button
                    className="btn btn-secondary mt-3"
                    type="button"
                    onClick={generateSampleExcel}
                  >
                    Tải xuống mẫu Excel
                  </button>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button
                    className="btn btn-primary save-btn"
                    type="button"
                    onClick={handleSaveQuiz}
                  >
                    Lưu bài
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarStatus}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default QuizAdd;
