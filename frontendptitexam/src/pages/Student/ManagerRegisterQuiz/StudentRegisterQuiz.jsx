import React, { useState, useEffect } from "react";
import { Snackbar, LinearProgress, Alert } from "@mui/material";
import Slide from "@mui/material/Slide";
import "./StudentRegisterQuiz.css";
import StudentRegisterQuizFilter from "../../../components/student/ManagerRegisterQuiz/StudentRegisterQuizFilter";
import StudentRegisterQuizTable from "../../../components/student/ManagerRegisterQuiz/StudentRegisterQuizTable";
import { findAllRegisterQuizzes } from "../../../services/registerQuizServices";

const StudentRegisterQuiz = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSatus, setSnackbarStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [registerQuizListState, setRegisterQuizListState] = useState([]);
  const [filteredRegisterQuizList, setFilteredRegisterQuizList] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchRegisterQuizzes = async () => {
    try {
      const data = await findAllRegisterQuizzes();
      setFetching(true);
      setRegisterQuizListState(data);
      setFilteredRegisterQuizList(data);
    } catch (error) {
      console.error("Failed to fetch register quizzes:", error);
    }
  };

  useEffect(() => {
    if (!fetching) {
      fetchRegisterQuizzes();
    }
  }, [fetching]);

  const handleRegisterQuizFilter = (filteredRegisterQuiz) => {
    setFilteredRegisterQuizList(filteredRegisterQuiz);
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
        <StudentRegisterQuizFilter
          registerQuizList={registerQuizListState}
          onRegisterQuizFilter={handleRegisterQuizFilter}
        />
        <StudentRegisterQuizTable registerQuizList={filteredRegisterQuizList} />
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

export default StudentRegisterQuiz;
