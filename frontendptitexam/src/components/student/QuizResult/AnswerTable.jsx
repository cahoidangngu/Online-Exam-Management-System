import React from "react";

const AnswerTable = ({ jsonData }) => {
  const header = ["A", "B", "C", "D"];

  const generateAnswerDetailTable = (data) => {
    return data.map((element, index) => {
      const correctOption = element.correctOption;
      const userOption = element.userOption;
      let circleColor = "#677483";
      if (correctOption === userOption) circleColor = "rgb(56, 142, 60)";
      else if (correctOption !== userOption) circleColor = "#c81f17";

      return (
        <tr
          key={index}
          className="body-row"
          id={index + 1}
          onClick={() => (window.location.href = `#list-item-${index + 1}`)}
        >
          <td className="first-row-cell">
            <p className="df aic jcc css-1dtoqh9">
              <svg
                className="css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                style={{ width: "12px", height: "12px", translate: "0 2px" }}
              >
                <circle cx="12" cy="12" r="8" fill={circleColor}></circle>
              </svg>
            </p>
          </td>
          <td className="row-cell" colSpan="1">
            <p className="css-1dtoqh9 wbbw">{index + 1}</p>
          </td>
          <td className="row-cell" colSpan="3">
            <p className="css-1dtoqh9 wbbw">{element[`option${userOption}`]}</p>
          </td>
          <td className="row-cell" colSpan="3">
            <p className="css-1dtoqh9 wbbw">
              {element[`option${correctOption}`]}
            </p>
          </td>
          <td className="row-cell" colSpan="2">
            <p className="css-1dtoqh9 wbbw" style={{ color: circleColor }}>
              ({(10 / data.length).toFixed(2)})
            </p>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="card table-question-card">
      <div className="detail-table">
        <h2 className="card-title text-center" style={{ color: "#8A0202" }}>
          Answers
        </h2>
        <p className="card-text text-center" style={{ color: "#8A0202" }}>
          Questions 4/5
        </p>
        <table className="tb-root table-hover">
          <thead className="tb-header">
            <tr className="header-row">
              <th className="header-cell" scope="col" colSpan="1">
                <p className="wbbw header-content"></p>
              </th>
              <th className="header-cell" scope="col" colSpan="1">
                <p
                  className="header-content"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  Câu
                </p>
              </th>
              <th className="header-cell" scope="col" colSpan="3">
                <p
                  className="header-content"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  Chọn
                </p>
              </th>
              <th className="header-cell" scope="col" colSpan="3">
                <p
                  className="header-content"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  Đáp án đúng
                </p>
              </th>
              <th className="header-cell" scope="col" colSpan="2">
                <p
                  className="header-content"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  Điểm
                </p>
              </th>
            </tr>
          </thead>
          <tbody className="tb-body">
            {generateAnswerDetailTable(jsonData)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnswerTable;
