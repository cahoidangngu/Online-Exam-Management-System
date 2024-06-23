import React, { useState, useEffect } from "react";

const StudentQuizFilter = ({ quizList, onQuizFilter }) => {
  // State for filters
  // type, difficulty, status, subjects
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [orderBy, setOrderBy] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const filterQuizzes = () => {
    let filteredQuizzes = [...quizList];

    // Filter by quiz type
    if (selectedType !== null) {
      filteredQuizzes = filteredQuizzes.filter(
        (quiz) => quiz.type === selectedType
      );
    }

    // Filter by quiz subject
    if (selectedSubject !== "all") {
      filteredQuizzes = filteredQuizzes.filter(
        (quiz) => quiz.type === selectedSubject
      );
    }

    // Order quizzes
    if (orderBy !== null) {
      filteredQuizzes.sort((a, b) => a.id < b.id);
      // Assuming 'name' is the property for exam name
    } else {
      filteredQuizzes.sort((a, b) => a.title.localeCompare(b.title));
    }

    filteredQuizzes = filteredQuizzes.filter((quiz) =>
      quiz.title.includes(searchTitle)
    );

    onQuizFilter(filteredQuizzes);
  };
  useEffect(() => {
    filterQuizzes();
  }, [selectedType, orderBy, selectedSubject, searchTitle, quizList]);

  return (
    <div className="table-head">
      <div className="form-group pull-right">
        <div className="table-filter">
          <div className="table-filter-left">
            {/* Quiz Type Filters */}
            <div className="table-filter-item filter-exam-type mb-3">
              <p className="table-filter-label form-label">Loại kỳ thi:</p>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="examType"
                  id="allType"
                  value="null"
                  checked={selectedType === null}
                  onChange={() => setSelectedType(null)}
                />
                <label className="form-check-label" htmlFor="allType">
                  Tất cả
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="examType"
                  id="allTime"
                  value="1"
                  checked={selectedType === 1}
                  onChange={() => setSelectedType(1)}
                />
                <label className="form-check-label" htmlFor="allTime">
                  Tự do
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="examType"
                  id="timeRestrict"
                  value="0"
                  checked={selectedType === 0}
                  onChange={() => setSelectedType(0)}
                />
                <label className="form-check-label" htmlFor="timeRestrict">
                  Giới hạn
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
                  Tên bài
                </label>
              </div>
            </div>
          </div>
          {/* Subject Filter */}
          <div className="table-filter-right">
            <div className="table-filter-item filter-exam-subject mb-3">
              <label
                htmlFor="selectExamSubject"
                className="table-filter-label form-label"
              >
                Môn học
              </label>
              <select
                className="form-select"
                id="selectExamSubject"
                aria-label="select exam subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="Toán">Toán</option>
                <option value="Văn">Văn</option>
                <option value="Lịch sử">Lịch sử</option>
                <option value="Anh">Anh</option>
              </select>
            </div>
          </div>
        </div>
        <div class="table-search-bar">
          <span class="counter pull-right"></span>
          <input
            type="text"
            class="search form-control mb-3"
            placeholder="Nhập tên bài thi"
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentQuizFilter;
