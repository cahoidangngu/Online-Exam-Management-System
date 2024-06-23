import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import AddIcon from "@mui/icons-material/Add";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import "./sidebar.css";

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const [subMenuStates, setSubMenuStates] = useState({});

  const isRouteActive = (route) => {
    return location.pathname === route;
  };

  const toggleSubMenu = (menu) => {
    setSubMenuStates((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "close" : ""}`}>
      <div className="logo-details">
        <Link to="#" className="logo-image">
          <img src="./logo/logo_page.jpg" alt="Logo" />
        </Link>
        <span className="logo-name">PTIT</span>
      </div>
      <ul className="nav-links">
        <li
          className={`nav-link-item ${
            isRouteActive("/quiz_manager") || isRouteActive("/student_manager")
              ? "inPage"
              : ""
          } ${subMenuStates.dashboard ? "showMenu" : ""}`}
        >
          <div className="icon-box" onClick={() => toggleSubMenu("dashboard")}>
            <Link to="#">
              <GridViewOutlinedIcon className="icon" />
              <span className="link-name">Dashboard</span>
            </Link>
            <ArrowBackIosRoundedIcon className="icon arrow" />
          </div>
          <ul className="sub-menu">
            <li>
              <Link to="#" className="link-name">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/quiz_manager"
                className={isRouteActive("/quiz_manager") ? "inPage" : ""}
              >
                Quản lý kỳ thi
              </Link>
            </li>
            <li>
              <Link
                to="/student_manager"
                className={isRouteActive("/student_manager") ? "inPage" : ""}
              >
                Quản lý người dùng
              </Link>
            </li>
          </ul>
        </li>
        <li
          className={`nav-link-item ${
            isRouteActive("/add_quiz") ? "inPage" : ""
          } `}
        >
          <div className="icon-box">
            <Link to="/add_quiz">
              <AddIcon className="icon" />
              <span className="link-name">Tạo kỳ thi</span>
            </Link>
          </div>
        </li>
        <li
          className={`nav-link-item ${
            isRouteActive("/quiz_analystic") ||
            isRouteActive("/student_analystic")
              ? "inPage"
              : ""
          } ${subMenuStates.analystic ? "showMenu" : ""}`}
        >
          <div className="icon-box" onClick={() => toggleSubMenu("analystic")}>
            <Link to="#">
              <PieChartOutlinedIcon className="icon" />
              <span className="link-name">Thống kê</span>
            </Link>
            <ArrowBackIosRoundedIcon className="icon arrow" />
          </div>
          <ul className="sub-menu">
            <li>
              <Link to="#" className="link-name">
                Thống kê
              </Link>
            </li>
            <li>
              <Link
                to="/quiz_analystic"
                className={isRouteActive("/quiz_analystic") ? "inPage" : ""}
              >
                Thống kê bài làm
              </Link>
            </li>
            <li>
              <Link
                to="/student_analystic"
                className={isRouteActive("/student_analystic") ? "inPage" : ""}
              >
                Thống kê người dùng
              </Link>
            </li>
          </ul>
        </li>
        <li
          className={`nav-link-item ${
            isRouteActive("/student_result_manager") ? "inPage" : ""
          }`}
        >
          <div className="icon-box">
            <Link to="/student_result_manager">
              <SchoolOutlinedIcon className="icon" />
              <span className="link-name">Kết quả bài làm</span>
            </Link>
          </div>
        </li>
        <li className="nav-link-item">
          <div className="logout-section">
            <Link to="/logout">
              <LogoutIcon className="icon" />
              <span className="link-name">Đăng xuất</span>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
