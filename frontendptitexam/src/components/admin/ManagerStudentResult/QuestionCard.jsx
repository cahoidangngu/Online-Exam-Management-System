import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import { findOneQuestion } from "../../../services/questionServices";

const QuestionCard = ({ participantAnswer, participantAnswerIndex }) => {
  const [questionState, setQuestionState] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      const question = await findOneQuestion(participantAnswer.questionId);
      setQuestionState(question);
    };
    if (questionState === null) fetchQuestion();
  }, [questionState]);

  if (questionState === null) return <div>Loading</div>;

  return (
    <div id="list-item-1" class="question-card card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Câu {participantAnswerIndex + 1}</h5>
      </div>
      <div class="card-body">
        <div class="input-group input-group-lg">
          <span class="input-group-text" id="inputGroup-sizing-lg">
            Câu hỏi:
          </span>
          <input
            type="text"
            class="form-control"
            value={questionState.questionTitle}
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            readOnly
          />
        </div>
        <ul className="d-flex flex-column mt-4 mb-0 ps-0 pe-5 gap-2">
          {questionState.optionAnswerList.map(
            (optionAnswer, optionAnswerIndex) => (
              <QuestionItem
                key={optionAnswerIndex}
                label={optionAnswerIndex}
                value={optionAnswer.optionAnswerTitle}
                isSelected={
                  optionAnswer.id === participantAnswer.userOptionAnswerId
                }
                isCorrect={
                  optionAnswer.id === questionState.correctOptionAnswer
                }
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default QuestionCard;
