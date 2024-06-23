import React, { useState, useEffect } from "react";
import { Snackbar, LinearProgress, Alert } from "@mui/material";
import Slide from "@mui/material/Slide";
import "./ManagerStudentResult.css";
import { findAllParticipantAttempts } from "../../../services/participantAttemptServices";
import StudentResultFilter from "../../../components/admin/ManagerStudentResult/StudentResultFilter";
import StudentResultTable from "../../../components/admin/ManagerStudentResult/StudentResultTable";
import StudentResultModal from "../../../components/admin/ManagerStudentResult/StudentResultModal";

const ManagerResult = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSatus, setSnackbarStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [participantAttemptListState, setParticipantAttemptListState] =
    useState([]);
  const [filteredParticipantAttemptList, setFilteredParticipantAttemptList] =
    useState([]);
  const [selectedParticipantAttempt, setSelectedParticipantAttempt] =
    useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [fetching, setFetching] = useState(false);

  const fetchParticipantAttempts = async () => {
    try {
      const data = await findAllParticipantAttempts();
      setFetching(true);
      setParticipantAttemptListState(data);
      setFilteredParticipantAttemptList(data);
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    }
  };

  useEffect(() => {
    if (!fetching) {
      fetchParticipantAttempts();
    }
  }, [fetching]);

  const handleParticipantAttemptFilter = (filteredParticipantAttempts) => {
    setFilteredParticipantAttemptList(filteredParticipantAttempts);
  };

  const handleParticipantAttemptSelect = (ParticipantAttempt) => {
    setSelectedParticipantAttempt(ParticipantAttempt);
    setModalShow(true);
  };

  const closeModal = async () => {
    setFetching(false);
    setModalShow(false);
    setSelectedParticipantAttempt(null);
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
        <StudentResultFilter
          participantAttemptList={participantAttemptListState}
          onParticipantAttemptFilter={handleParticipantAttemptFilter}
        />
        <StudentResultTable
          participantAttemptList={filteredParticipantAttemptList}
          onParticipantAttemptSelect={handleParticipantAttemptSelect}
        />
        {selectedParticipantAttempt && (
          <StudentResultModal
            isVisible={modalShow}
            onClose={closeModal}
            participantAttempt={selectedParticipantAttempt}
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

export default ManagerResult;
