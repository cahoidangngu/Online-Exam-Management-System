import React from "react";

const QuestionCard = ({ jsonData }) => {
  const header = ["A", "B", "C", "D"];

  const parseDataToExamContentVer2 = (data) => {
    return data.map((element, index) => {
      const correctOption = element.correctOption;
      const userOption = element.userOption;
      let headerColor = "#e6e8ea";
      let bodyColor = "#fff";
      if (correctOption === userOption) {
        headerColor = "rgb(56, 142, 60)";
        bodyColor = "#EFF8F1";
      } else if (correctOption !== userOption) {
        headerColor = "#c81f17";
        bodyColor = "#F6D0D0";
      }
      return (
        <div key={index} id={`list-item-${index + 1}`} className="card mb-3">
          <h5
            className="card-header"
            style={{ backgroundColor: headerColor, color: "white" }}
          >
            Question {index + 1}
          </h5>
          <div className="card-body">
            <p className="card-text fs-4">{element.question}</p>
            <ul className="d-flex flex-column mt-4 ps-0 pe-5 gap-3">
              {header.map((option, i) => (
                <li
                  key={i}
                  className={`answer-card ${
                    correctOption === i + 1 ? "answer-card-correct" : ""
                  } ${
                    userOption === i + 1 && userOption !== correctOption
                      ? "answer-card-error"
                      : ""
                  } card`}
                >
                  <div className="answer-option d-flex align-items-center">
                    <div className="answer-card-head align-self-stretch d-flex align-items-center px-4">
                      {option}
                    </div>
                    <div className="answer-card-body ms-3 d-flex flex-shrink-1">
                      <p className="card-text">{element[`option${i + 1}`]}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="question-view-container exam-content card">
      {parseDataToExamContentVer2(jsonData)}
    </div>
  );
};

export default QuestionCard;
