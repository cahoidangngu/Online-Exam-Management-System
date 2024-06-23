import React, { useState, useEffect } from "react";
import { Snackbar, LinearProgress, Alert } from "@mui/material";
import Slide from "@mui/material/Slide";
import "./ManagerQuiz.css";
import QuizModal from "../../../components/admin/ManagerQuiz/QuizModal";
import QuizFilter from "../../../components/admin/ManagerQuiz/QuizFilter";
import QuizTable from "../../../components/admin/ManagerQuiz/QuizTable";
import { findAllQuizzes } from "../../../services/quizServices";

const ManagerQuiz = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSatus, setSnackbarStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [quizListState, setQuizListState] = useState([]);
  const [filteredQuizList, setFilteredQuizList] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [modalShow, setModalShow] = useState(false);
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

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
    setModalShow(true);
  };

  const closeModal = async () => {
    setFetching(false);
    setModalShow(false);
    setSelectedQuiz(null);
  };

  const handleUpdateSuccess = async (status, message) => {
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
        <QuizFilter quizList={quizListState} onQuizFilter={handleQuizFilter} />
        <QuizTable
          quizList={filteredQuizList}
          onQuizSelect={handleQuizSelect}
        />
        {selectedQuiz && (
          <QuizModal
            isVisible={modalShow}
            onClose={closeModal}
            onUpdateSuccess={handleUpdateSuccess}
            quiz={selectedQuiz}
          />
        )}
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

export default ManagerQuiz;
