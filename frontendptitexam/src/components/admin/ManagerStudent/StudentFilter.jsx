import React, { useState, useEffect } from "react";

const StudentFilter = ({ studentList, onStudentFilter }) => {
  // State for filters
  const [selectGender, setUserGender] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const [selectedStudyClass, setSelectedStudyClass] = useState("all");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const filterStudents = () => {
      let filteredStudents = [...studentList];

      if (selectGender !== null) {
        filteredStudents = filteredStudents.filter(
          (student) => student.gender === selectGender
        );
      }

      if (selectedStudyClass !== "all") {
        filteredStudents = filteredStudents.filter(
          (student) => student.studyClass === selectedStudyClass
        );
      }

      // Order exams
      if (orderBy !== null) {
        filteredStudents.sort((a, b) => a.fullName.localeCompare(b.fullName));
      } else {
        filteredStudents.sort((a, b) => a.id > b.id);
      }

      filteredStudents = filteredStudents.filter((student) =>
        student.fullName.includes(searchName)
      );

      onStudentFilter(filteredStudents);
    };
    filterStudents();
  }, [selectGender, orderBy, selectedStudyClass, searchName, studentList]);

  return (
    <div className="table-head">
      <div className="form-group pull-right">
        <div className="table-filter">
          <div className="table-filter-left">
            {/* Exam Type Filters */}
            <div className="table-filter-item filter-exam-type mb-3">
              <p className="table-filter-label form-label">Giới tính:</p>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="examType"
                  id="allType"
                  value="null"
                  checked={selectGender === null}
                  onChange={() => setUserGender(null)}
                />
                <label className="form-check-label" htmlFor="allType">
                  Tất cả
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userGender"
                  id="men"
                  value="1"
                  checked={selectGender}
                  onChange={() => setUserGender(true)}
                />
                <label className="form-check-label" htmlFor="men">
                  Nam
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userGender"
                  id="women"
                  value="0"
                  checked={!selectGender}
                  onChange={() => setUserGender(false)}
                />
                <label className="form-check-label" htmlFor="women">
                  Nữ
                </label>
              </div>
            </div>
            {/* Order By Filters */}
            <div className="table-filter-item filter-order-by mb-3">
              <p className="table-filter-label form-label">Sắp xếp theo:</p>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="orderBy"
                  id="addDay"
                  value="0"
                  checked={orderBy === null}
                  onChange={() => setOrderBy(null)}
                />
                <label className="form-check-label" htmlFor="addDay">
                  Ngày thêm
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="orderBy"
                  id="examName"
                  value="1"
                  checked={orderBy === "1"}
                  onChange={() => setOrderBy("1")}
                />
                <label className="form-check-label" htmlFor="examName">
                  Tên
                </label>
              </div>
            </div>
          </div>
          {/* Subject Filter */}
          <div className="table-filter-right">
            <div className="table-filter-item filter-exam-subject mb-3">
              <label
                htmlFor="selectStudyClass"
                className="table-filter-label form-label"
              >
                Lớp
              </label>
              <select
                className="form-select"
                id="selectStudyClass"
                aria-label="select student study class"
                value={selectedStudyClass}
                onChange={(e) => setSelectedStudyClass(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="01">Lớp 1</option>
                <option value="02">Lớp 2</option>
                <option value="03">Lớp 3</option>
                <option value="04">Lớp 4</option>
                <option value="05">Lớp 5</option>
              </select>
            </div>
          </div>
        </div>
        <div class="table-search-bar">
          <span class="counter pull-right"></span>
          <input
            type="text"
            class="search form-control mb-3"
            placeholder="Nhập tên sinh viên"
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentFilter;
