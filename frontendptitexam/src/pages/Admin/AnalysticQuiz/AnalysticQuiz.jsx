import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import jsPDF from "jspdf";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { findAllRegisterQuizzes } from "../../../services/registerQuizServices";
import { findAllQuizzes } from "../../../services/quizServices";
import html2canvas from "html2canvas";
import "./AnalysticQuiz.css";

const pieData = [
  { id: 0, value: 1, label: "Đã đăng kí", color: "#c81f17" },
  { id: 1, value: 1, label: "Chưa đăng kí", color: "#dee2e6" },
];

const AnalysticQuiz = () => {
  const [quizListState, setQuizListState] = useState([]);
  const [registeruizListState, setRegisterQuizListState] = useState([]);
  const [pieDataState, setPieDataState] = useState(pieData);
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
    const fetchQuizAnalystic = async () => {
      const registerQuizzes = await findAllRegisterQuizzes();
      const quizzes = await findAllQuizzes();
      setQuizListState(quizzes);
      setRegisterQuizListState(registerQuizzes);
    };
    fetchQuizAnalystic();
  }, []);

  useEffect(() => {
    const quizzes = filterQuizzes(quizListState);
    let numberRegisterQuiz = 0;

    quizzes.forEach((quiz) => {
      const registeredQuiz = registeruizListState.find(
        (registerQuiz) => registerQuiz.quiz.id === quiz.id
      );
      if (registeredQuiz) {
        numberRegisterQuiz += 1;
      }
    });

    setPieDataState([
      {
        id: 0,
        value: numberRegisterQuiz,
        label: "Đã đăng kí",
        color: "#c81f17",
      },
      {
        id: 1,
        value: quizzes.length - numberRegisterQuiz,
        label: "Chưa đăng kí",
        color: "#dee2e6",
      },
    ]);
  }, [selectedType, selectedSubject, quizListState, registeruizListState]);

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
      <h2 className="main-content-head">Phân tích bài kiểm tra</h2>
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
              <h5 className="card-title">Tổng số bài kiểm tra</h5>
              <h6 className="card-subtitle text-muted">
                {quizListState.length}
              </h6>
            </div>
            <FileDownloadOutlinedIcon
              className="bx bx-download down-btn"
              onClick={exportToPDF}
            ></FileDownloadOutlinedIcon>
          </div>
          <div className="card-body">
            <PieChart
              series={[
                {
                  data: pieDataState,
                },
              ]}
              width={800}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysticQuiz;
