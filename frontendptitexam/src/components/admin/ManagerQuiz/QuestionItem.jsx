import React from "react";

const QuestionItem = ({ label, value, onChange, isSelected, onClick }) => {
  return (
    <li
      className={`answer-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
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
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </li>
  );
};

export default QuestionItem;
