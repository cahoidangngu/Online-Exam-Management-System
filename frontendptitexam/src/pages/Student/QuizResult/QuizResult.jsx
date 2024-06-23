import React, { useEffect } from "react";
import QuestionDetail from "./QuestionDetail";
import AnswerTable from "./AnswerTable";
import { Chart } from "chart.js";

const QuizResult = () => {

  useEffect(() => {
    const ctx = document.getElementById("chartjs-doughnut");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Làm đúng", "Làm sai", "Chưa hoàn thành"],
        datasets: [
          {
            data: [30, 8, 5],
            backgroundColor: ["rgb(56, 142, 60)", "#c81f17", "#dee2e6"],
            borderColor: "transparent",
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        cutoutPercentage: 0,
      },
    });
  }, []);

  return (
    <section className="main-section">
      <div className="container-fluid">
        <div className="exam-result">
          <div className="point-container">
            <div className="insights">
              <div className="point insights-bg-first">
                <div className="middle-first">
                  <div
                    className="df aic jcc pr"
                    style={{
                      width: "100%",
                      minHeight: "96px",
                      background:
                        "linear-gradient(157.53deg, #c81f17 6.34%, #8A0202 101.19%)",
                      borderRadius: "16px 16px 0px 0px",
                      padding: "12px",
                    }}
                  >
                    <h6
                      className="MuiTypography-root MuiTypography-h6 MuiTypography-alignCenter semi-bold css-gkttbi"
                      id="score-view-point"
                      style={{
                        marginRight: "8px",
                        color: "white",
                        fontSize: "1.4rem",
                      }}
                    >
                      9.75 / 10
                    </h6>
                  </div>
                  <div className="text-content">
                    <div
                      className="df jcsb w100"
                      style={{ marginBottom: "12px" }}
                    >
                      <div className="df aic">
                        <p
                          className="MuiTypography-root MuiTypography-body2 css-1jg1chf"
                          style={{ marginRight: "16px", minWidth: "56px" }}
                        >
                          Thời gian
                        </p>
                      </div>
                      <div className="MuiBox-root css-0">
                        <p className="MuiTypography-root MuiTypography-body2 MuiTypography-alignRight semi-bold css-pm05iu">
                          38 phút 50 giây
                        </p>
                      </div>
                    </div>
                    {/* Additional Information */}
                  </div>
                </div>
              </div>
              <div className="answer-porpotion insights-bg">
                <span className="material-symbols-sharp portion">
                  leaderboard
                </span>
                <div className="middle">
                  <div className="rank__top">{/* Rank Information */}</div>
                </div>
              </div>
              <div className="answer-detail insights-bg p-0" id="no-padding">
                <h3 className="text-center mt-2" style={{ color: "#c81f17" }}>
                  Biểu đồ bài làm
                </h3>
                <div className="row w-100">
                  <canvas
                    id="chartjs-doughnut"
                    style={{
                      display: "block",
                      height: "250px",
                      width: "507px",
                    }}
                    className="chartjs-render-monitor"
                  ></canvas>
                </div>
              </div>
            </div>
          </div>
          <div className="bot">
            <QuestionDetail jsonData={jsonData} />
            <AnswerTable jsonData={jsonData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizResult;
