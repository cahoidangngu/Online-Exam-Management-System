import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import jsPDF from "jspdf";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { findAllQuizzes } from "../../../services/quizServices";
import html2canvas from "html2canvas";
import "./AnalysticStudent.css";
import { findAllByQuiz } from "../../../services/participantAttemptServices";

const lineData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const AnalysticStudent = () => {
  const [quizListState, setQuizListState] = useState([]);
  const [totalParticipantAttempt, setTotalParticipantAttempt] = useState(0);
  const [lineDataState, setLineDataState] = useState(lineData);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("all");

  const filterQuizzes = (quizList) => {
    let filteredQuizzes = [...quizList];

    // Filter by quiz type
    if (selectedType !== null) {
      filteredQuizzes = filteredQuizzes.filter(
        (quiz) => quiz.type === selectedType
      );
    }

    // Filter by quiz subject
    if (selectedSubject !== "all") {
      filteredQuizzes = filteredQuizzes.filter(
        (quiz) => quiz.subject === selectedSubject
      );
    }

    return filteredQuizzes;
  };
  useEffect(() => {
    const fetchUserAnalystic = async () => {
      const quizzes = await findAllQuizzes();
      setQuizListState(quizzes);
    };
    fetchUserAnalystic();
  }, []);

  useEffect(() => {
    const fetchParticipantAttempts = async () => {
      const quizzes = filterQuizzes(quizListState);
      let participantAttemptList = [];

      for (const quiz of quizzes) {
        const participantAttempts = await findAllByQuiz(quiz.id);
        participantAttemptList = [
          ...participantAttemptList,
          ...participantAttempts,
        ];
      }

      setTotalParticipantAttempt(participantAttemptList.length);

      let numbersOfScore = [...lineData];

      for (let i = 0; i < 10; i++) {
        let count = 0;
        participantAttemptList.forEach((participantAttempt) => {
          if (participantAttempt.score === i + 1) count += 1;
        });
        numbersOfScore[i] = count;
      }
      setLineDataState(numbersOfScore);
    };

    fetchParticipantAttempts();
  }, [selectedType, selectedSubject, quizListState]);

  const exportToPDF = () => {
    const table = document.querySelector(".card");
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("thongke.pdf");
    });
  };

  return (
    <div className="main-content">
      <h2 className="main-content-head">Phân tích phổ điểm</h2>
      <div className="main-content-body">
        <div className="chart-head">
          <div className="form-group pull-right">
            <div className="chart-filter">
              <div className="chart-filter-left">
                <div className="chart-filter-item filter-exam-type mb-3">
                  <p className="chart-filter-label form-label">Loại kỳ thi:</p>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="examType"
                      id="allType"
                      value="null"
                      checked={selectedType === null}
                      onChange={() => setSelectedType(null)}
                    />
                    <label className="form-check-label" htmlFor="allType">
                      Tất cả
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="examType"
                      id="allTime"
                      value="1"
                      checked={selectedType === 1}
                      onChange={() => setSelectedType(1)}
                    />
                    <label className="form-check-label" htmlFor="allTime">
                      Tự do
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="examType"
                      id="timeRestrict"
                      value="0"
                      checked={selectedType === 0}
                      onChange={() => setSelectedType(0)}
                    />
                    <label className="form-check-label" htmlFor="timeRestrict">
                      Giới hạn
                    </label>
                  </div>
                </div>
              </div>
              <div className="chart-filter-right">
                <div className="chart-filter-item filter-exam-subject mb-3">
                  <label
                    htmlFor="selectExamSubject"
                    className="chart-filter-label form-label"
                  >
                    Môn học
                  </label>
                  <select
                    className="form-select"
                    id="selectExamSubject"
                    aria-label="select exam subject"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="all">Tất cả</option>
                    <option value="Toán">Toán</option>
                    <option value="Văn">Văn</option>
                    <option value="Lịch sử">Lịch sử</option>
                    <option value="Anh">Anh</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card analystic">
          <div className="card-header">
            <div>
              <h5 className="card-title">Tổng số bài làm</h5>
              <h6 className="card-subtitle text-muted">
                {totalParticipantAttempt}
              </h6>
            </div>
            <FileDownloadOutlinedIcon
              className="bx bx-download down-btn"
              onClick={exportToPDF}
            ></FileDownloadOutlinedIcon>
          </div>
          <div className="card-body">
            <LineChart
              xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
              yAxis={[{ min: 0, max: 100 }]}
              series={[
                {
                  data: lineDataState,
                  color: "#c81f17",
                },
              ]}
              width={1200}
              height={600}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysticStudent;
