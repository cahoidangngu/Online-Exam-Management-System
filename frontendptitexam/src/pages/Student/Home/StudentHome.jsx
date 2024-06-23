import React, { useState, useEffect } from "react";
import { Snackbar, LinearProgress, Alert } from "@mui/material";
import Slide from "@mui/material/Slide";
import "./StudentHome.css";
import StudentQuizFilter from "../../../components/student/Home/StudentQuizFilter";
import StudentQuizTable from "../../../components/student/Home/StudentQuizTable";
import { saveRegisterQuiz } from "../../../services/registerQuizServices";
import formatedDate from "../../../config/formatedDate";
import { findAllQuizzes } from "../../../services/quizServices";

const StudentHome = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSatus, setSnackbarStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [quizListState, setQuizListState] = useState([]);
  const [filteredQuizList, setFilteredQuizList] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchQuizzes = async () => {
    try {
      const data = await findAllQuizzes();
      setFetching(true);
      setQuizListState(data);
      setFilteredQuizList(data);
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    }
  };

  useEffect(() => {
    if (!fetching) {
      fetchQuizzes();
    }
  }, [fetching]);

  const handleQuizFilter = (filteredQuiz) => {
    setFilteredQuizList(filteredQuiz);
  };

  const handleQuizRegister = async (quiz) => {
    try {
      const newRegisterQuiz = {
        id: 0,
        quiz: {
          id: quiz.id,
        },
        user: {
          // id: localStorage.getItem("user")
          id: 5,
        },
        status: true,
        beginTime: formatedDate(new Date()),
        endTime: formatedDate(new Date()),
      };
      const response = await saveRegisterQuiz(newRegisterQuiz);
      if (response.status === 200) {
        handleRegisterQuizSuccess(
          "success",
          "Bài kiểm tra đã được cập nhật thành công."
        ); // Invoke the callback on successful deletion
      } else {
        throw new Error("Failed to update the quiz.");
      }
    } catch (error) {
      handleRegisterQuizSuccess(
        "error",
        "Có lỗi xảy ra, không thể cập nhật bài kiểm tra: \n" + error.message
      );
    }
  };

  const handleRegisterQuizSuccess = (status, message) => {
    setSnackbarMessage(message);
    setSnackbarStatus(status);
    setSnackbarOpen(true);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="main-content">
      <h2 className="main-content-head">Danh Sách Bài Kiểm Tra</h2>
      <div className="main-content-body">
        <StudentQuizFilter
          quizList={quizListState}
          onQuizFilter={handleQuizFilter}
        />
        <StudentQuizTable
          quizList={filteredQuizList}
          onQuizRegister={handleQuizRegister}
        />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          TransitionComponent={Slide}
          action={<LinearProgress variant="determinate" value={progress} />}
        >
          <Alert variant="filled" severity={`${snackbarSatus}`}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default StudentHome;
