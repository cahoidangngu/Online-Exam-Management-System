import React from "react";
import { Link } from "react-router-dom";

const StudentRegisterQuizTable = ({ registerQuizList }) => {
  return (
    <div className="table-body">
      <table className="table table-striped table-bordered results">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Tên bài kiểm tra</th>
            <th>Loại kỳ thi</th>
            <th>Độ khó</th>
            <th>Môn học</th>
            <th>Thời gian đăng ký</th>
            <th>Thời gian làm</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody className="table-exam-manager text-center">
          {registerQuizList.map((registerQuiz) => (
            <tr key={registerQuiz.id}>
              <th scope="row">{registerQuiz.id}</th>
              <td>{registerQuiz.quiz.title}</td>
              <td>{registerQuiz.quiz.type}</td>
              <td>{registerQuiz.quiz.difficulty}</td>
              <td>{registerQuiz.beginTime}</td>
              <td>{registerQuiz.quiz.subject}</td>
              <td>{registerQuiz.quiz.duration}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-detail-exam"
                >
                  <Link className="btn-taking-quiz" to={`/quiz_taking/${registerQuiz.id}`}>Làm bài</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentRegisterQuizTable;
