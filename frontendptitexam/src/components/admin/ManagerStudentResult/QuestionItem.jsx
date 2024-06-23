import React from "react";

const QuestionItem = ({ label, value, onChange, isSelected, isCorrect }) => {
  return (
    <li
      className={`answer-card ${
        isSelected === isCorrect
          ? "correct"
          : isSelected
          ? "selected"
          : isCorrect
          ? "correct"
          : ""
      }`}
    >
      <div className={`input-group mb-2`}>
        <span className="input-group-text" id={`inputGroup-sizing-${label}`}>
          {label}
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby={`inputGroup-sizing-${label}`}
          value={value}
          readOnly
        />
      </div>
    </li>
  );
};

export default QuestionItem;
