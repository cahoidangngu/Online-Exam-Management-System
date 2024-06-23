import React from "react";
import QuestionItem from "./QuestionItem";

const QuestionCard = ({ questionData, questionIndex, setQuiz, quiz }) => {
  const handleQuestionTitleChange = (event) => {
    const updatedQuestion = {
      ...questionData,
      questionTitle: event.target.value,
    };
    const updatedQuestionList = [...quiz.questionList];
    updatedQuestionList[questionIndex] = updatedQuestion;
    setQuiz({ ...quiz, questionList: updatedQuestionList });
  };

  const handleCorrectOptionAnswerChange = (optionAnswerIndex) => {
    const updatedQuestion = {
      ...questionData,
      correctOptionAnswer: optionAnswerIndex,
    };
    const updatedQuestionList = [...quiz.questionList];
    updatedQuestionList[questionIndex] = updatedQuestion;
    setQuiz({ ...quiz, questionList: updatedQuestionList });
  };

  const handleOptionAnswerTitleChange = (optionAnswerIndex, newValue) => {
    const updatedQuestion = { ...questionData };
    const updateOptionAnswer = updatedQuestion.optionAnswers[optionAnswerIndex];
    updatedQuestion.optionAnswers[optionAnswerIndex] = {
      ...updateOptionAnswer,
      optionAnswerTitle: newValue,
    };
    const updatedQuestionList = [...quiz.questionList];
    updatedQuestionList[questionIndex] = updatedQuestion;
    setQuiz({ ...quiz, questionList: updatedQuestionList });
  };

  const handleAddOptionAnswer = () => {
    const newOptionAnswerLists = [
      ...questionData.optionAnswerList,
      { id: 0, optionAnswerTitle: "" }, // Add an empty string for a new option
    ];
    const updatedQuestion = {
      ...questionData,
      optionAnswerList: newOptionAnswerLists,
    };
    const updatedQuestionList = [...quiz.questionList];
    updatedQuestionList[questionIndex] = updatedQuestion;
    setQuiz({ ...quiz, questionList: updatedQuestionList });
  };

  const handleDeleteQuestion = () => {
    const updatedQuestionList = quiz.questionList.filter(
      (_, index) => index !== questionIndex
    );
    setQuiz({ ...quiz, questionList: updatedQuestionList });
  };
  if (questionData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div id="list-item-1" class="question-card card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Câu {questionIndex + 1}</h5>
        <button
          className="btn btn-danger btn-sm"
          type="button"
          onClick={handleDeleteQuestion}
        >
          Xóa
        </button>
      </div>
      <div class="card-body">
        <div class="input-group input-group-lg">
          <span class="input-group-text" id="inputGroup-sizing-lg">
            Câu hỏi:
          </span>
          <input
            type="text"
            class="form-control"
            value={questionData.questionTitle}
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            onChange={handleQuestionTitleChange}
          />
        </div>
        <ul className="d-flex flex-column mt-4 mb-0 ps-0 pe-5 gap-2">
          {questionData.optionAnswerList.map(
            (optionAnswer, optionAnswerIndex) => (
              <QuestionItem
                key={optionAnswerIndex}
                label={optionAnswerIndex}
                value={optionAnswer.optionAnswerTitle}
                onChange={(newValue) =>
                  handleOptionAnswerTitleChange(optionAnswerIndex, newValue)
                }
                isSelected={
                  optionAnswer.id === questionData.correctOptionAnswer
                }
                onClick={() =>
                  handleCorrectOptionAnswerChange(
                    optionAnswer.id === 0 ? optionAnswerIndex : optionAnswer.id
                  )
                }
              />
            )
          )}
        </ul>
        <div class="d-grid gap-2 add-question-item-section">
          <button
            class="btn btn-primary add-question-item-btn"
            type="button"
            onClick={handleAddOptionAnswer}
          >
            <i class="bx bx-plus"></i> Thêm câu trả lời
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
