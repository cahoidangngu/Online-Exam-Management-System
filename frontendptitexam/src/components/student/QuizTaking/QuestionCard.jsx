import React from "react";

const QuestionCard = ({ question, index }) => (
  <div id={`0-${index}`} className="question-card card">
    <h5 className="card-header">Câu {index + 1}</h5>
    <div className="card-body">
      <p className="card-text fs-4">{question.question}</p>
      <ul className="d-flex flex-column mt-4 ps-0 pe-5 gap-3">
        {["A", "B", "C", "D"].map((option) => (
          <li key={option} className="answer-card card border-secondary">
            <div className="answer-option d-flex align-items-center">
              <div className="answer-card-head rounded-start align-self-stretch d-flex align-items-center px-4">
                {option}
              </div>
              <div className="answer-card-body ms-3 d-flex flex-shrink-1">
                <p className="card-text">{question[option]}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default QuestionCard;
