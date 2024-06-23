import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./userNavbar.css";

const StudentNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid px-4">
        <div className="collapse navbar-collapse" id="navbarMobileToggle">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item inPage">
              <Link className="nav-link inPage" to="/student_home">
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/student_register_quiz">
                Làm Bài
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" to="/student_participant_attempt">
                Kết Quả
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chat_bot">
                Chat Bot
              </Link>
            </li>
          </ul>
          <div className="btn-group float-end">
            <a
              href="#"
              className="dropdown-toggle text-decoration-none text-light"
              data-bs-toggle="dropdown"
            >
              <img
                src="./user_material/user_profile.jpg"
                alt="Your Avatar"
                className="navbar-userprofile-avatar"
                height="35"
                width="35"
              />
              <span>Bình Nam Quân</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li className="user-class-profile">
                <a href="#" className="dropdown-item">
                  <i className="bi bi-lock-fill"></i> B21DCDT174
                </a>
              </li>
              <hr className="dropdown-divider" />
              <li>
                <a href="#" className="dropdown-item">
                  <i className="bi bi-lock-fill"></i> Hồ sơ
                </a>
              </li>
              <li>
                <a href="#" className="dropdown-item">
                  <i className="bi bi-lock-fill"></i> Lớp học
                </a>
              </li>
              <hr className="dropdown-divider" />
              <li>
                <a href="../../index.html" className="dropdown-item">
                  <i className="bi bi-box-arrow-right"></i> Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
