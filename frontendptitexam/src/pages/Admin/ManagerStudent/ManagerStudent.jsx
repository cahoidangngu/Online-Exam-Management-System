import React, { useState, useEffect } from "react";
import { Snackbar, LinearProgress, Alert } from "@mui/material";
import Slide from "@mui/material/Slide";
import { findAllUsers } from "../../../services/userServices";
import "./ManagerStudent.css";
import StudentFilter from "../../../components/admin/ManagerStudent/StudentFilter";
import StudentTable from "../../../components/admin/ManagerStudent/StudentTable";
import StudentModal from "../../../components/admin/ManagerStudent/StudentModal";

const ManagerStudent = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSatus, setSnackbarStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [studentListState, setStudentListState] = useState([]);
  const [filteredStudent, setFilteredStudent] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [fetching, setFetching] = useState(false);

  const fetchStudents = async () => {
    try {
      const data = await findAllUsers();
      setFetching(true);
      setStudentListState(data);
      setFilteredStudent(data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  useEffect(() => {
    if (!fetching) {
      fetchStudents();
    }
  }, [fetching]);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setModalShow(true);
  };

  const closeModal = async () => {
    setFetching(false);
    setModalShow(false);
    setSelectedStudent(null);
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
      <h2 className="main-content-head">Danh Sách Sinh Viên</h2>
      <div className="main-content-body">
        <StudentFilter
          studentList={studentListState}
          onStudentFilter={setFilteredStudent}
        />
        <StudentTable
          studentList={filteredStudent}
          onStudentSelect={handleStudentSelect}
        />
        {selectedStudent && (
          <StudentModal
            show={modalShow}
            onClose={closeModal}
            onUpdate={handleUpdateSuccess}
            student={selectedStudent}
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

export default ManagerStudent;
