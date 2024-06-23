import React from "react";

const StudentTable = ({ studentList, onStudentSelect }) => {
  return (
    <div className="table-body">
      <table className="table table-striped table-bordered results">
        <thead>
          <tr className="text-centered">
            <th>#</th>
            <th>Họ và tên</th>
            <th>Lớp học</th>
            <th>Giới tính</th>
            <th>Số điện thoại</th>
            <th>Loại</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody className="table-user-manager text-center">
          {studentList.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.fullName}</td>
              <td>{student.studyClass}</td>
              <td>{student.gender ? "Nam" : "Nữ"}</td>
              <td>{student.phone}</td>
              <td>{student.role.name}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onStudentSelect(student)}
                >
                  Thông tin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
