// src/Register.js
import React, { useState } from "react";
import "./Register.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { register } from "../../services/userServices";
import {toast} from "react-toastify";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [retypePasswordError, setRetypePasswordError] = useState("");

  const handleRetypePasswordBlur = () => {
    if (retypePassword !== password) {
      setRetypePasswordError(
        "Xác nhận mật khẩu không thành công, mời nhập lại!"
      );
    } else {
      setRetypePasswordError("");
    }
  };

  const handleSubmit = (e) => {
    const acc = JSON.parse(localStorage.getItem("acc"));
    if (acc !== null) {
      register({
        username: acc.username,
        password: acc.password,
        email: acc.email,
      })
        .then((res) => {})
        .then((res) => {
          toast.success("Đăng kí thành công vui lòng đăng nhập lại", {
            autoClose: 700,
          });
          navigate("/login");
        });
    } else {
      toast.warning("Vui lòng điền đủ thông tin", { autoClose: 700 });
    }
  };

  return (
    <div id="user-register">
      <div id="loader">
        <div className="spinner"></div>
      </div>
      <div className="row vh-100 g-0">
        <div className="col-lg-6 position-relative d-none d-lg-block">
          <div
            className="bg-holder"
            style={{
              backgroundImage: "url(../../img/side_background_image.jpg)",
            }}
          ></div>
        </div>
        <div className="col-lg-6">
          <div className="row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
            <div className="col col-sm-6 col-lg-7 col-xl-6">
              <a href="#" className="d-flex justify-content-center mb-4">
                <img
                  className="logo-img"
                  src="../../img/logo_web_page.jpg"
                  alt="Logo"
                />
              </a>
              <div className="text-center mb-5">
                <h3 className="fw-bold">Đăng ký tài khoản</h3>
              </div>
              <div className="position-relative">
                <hr className="text-secondary" />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bx bx-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-lg fs-6"
                    placeholder="Tên người dùng"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bx bx-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control form-control-lg fs-6"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bx bxs-low-vision"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control form-control-lg fs-6"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bx bxs-low-vision"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control form-control-lg fs-6"
                    placeholder="Xác nhận mật khẩu"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    onBlur={handleRetypePasswordBlur}
                    required
                  />
                </div>
                {retypePasswordError && (
                  <div className="error-message" role="alert">
                    {retypePasswordError}
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-lg w-100"
                  id="btn-login"
                >
                  Đăng ký
                </button>
              </form>
              <div className="text-center">
                <small>
                  Đã có tài khoản?{" "}
                  <a href="../../index.html" className="fw-bold">
                    Đăng nhập
                  </a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
