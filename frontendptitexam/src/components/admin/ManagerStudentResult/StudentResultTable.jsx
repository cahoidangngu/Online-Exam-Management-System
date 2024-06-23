import React, { useState } from "react";

const StudentResultTable = ({
  participantAttemptList,
  onParticipantAttemptSelect,
}) => {
  return (
    <div className="table-body">
      <table className="table table-striped table-bordered results">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Học và tên</th>
            <th>Tên bài kiểm tra</th>
            <th>Điểm</th>
            <th>Môn học</th>
            <th>Thời gian nộp</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody className="table-exam-manager text-center">
          {participantAttemptList.map((participantAttempt) => (
            <tr key={participantAttempt.id}>
              <th scope="row">{participantAttempt.id}</th>
              <td>{participantAttempt.registerQuiz.user.fullName}</td>
              <td>{participantAttempt.registerQuiz.quiz.title}</td>
              <td>{participantAttempt.score}</td>
              <td>{participantAttempt.registerQuiz.quiz.subject}</td>
              <td>{participantAttempt.finishTime}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-detail-exam"
                  onClick={() => onParticipantAttemptSelect(participantAttempt)}
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

export default StudentResultTable;
