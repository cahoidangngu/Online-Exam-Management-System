import React, { useState } from "react";

const QuizTable = ({ quizList, onQuizSelect }) => {
  return (
    <div className="table-body">
      <table className="table table-striped table-bordered results">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Tên bài kiểm tra</th>
            <th>Loại kỳ thi</th>
            <th>Độ khó</th>
            <th>Trạng thái</th>
            <th>Môn học</th>
            <th>Thời gian làm</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody className="table-exam-manager text-center">
          {quizList.map((quiz) => (
            <tr key={quiz.id}>
              <th scope="row">{quiz.id}</th>
              <td>{quiz.title}</td>
              <td>{quiz.type}</td>
              <td>{quiz.difficulty}</td>
              <td>{quiz.status === 0 ? "Kích hoạt" : "Không kích hoạt"}</td>
              <td>{quiz.subject}</td>
              <td>{quiz.duration}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-detail-exam"
                  onClick={() => onQuizSelect(quiz)}
                >
                  Xem bài
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizTable;
