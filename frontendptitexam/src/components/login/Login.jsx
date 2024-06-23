import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast}from "react-toastify";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext } from "../../Context/AppContext";
import { loginApi } from "../../services/userServices";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    loginApi({
      username: email,
      password: password,
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("accountLogin", JSON.stringify(res.data));
          login();
          toast.success("Đăng nhập thành công", { autoClose: 800 });
          if (res.data.authorities[0].authority === "ROLE_ADMIN") {
            localStorage.setItem("account", JSON.stringify(res.data.id));
            navigate("/admin");
          } else {
            localStorage.setItem("account", JSON.stringify(res.data.id));
            navigate("/");
          }
        }
      })
      .catch((e) => {
        if (e.code === "ERR_BAD_REQUEST") {
          toast.error("Tài khoản đã bị khóa");
        } else toast.error("Thông tin không chính xác");
      });
  };

  return (
    <div className="row vh-100 g-0" id="user-login">
      <div className="col-lg-6 position-relative d-none d-lg-block">
        <div
          className="bg-holder"
          style={{ backgroundImage: "url(img/side_background_image.jpg)" }}
        ></div>
      </div>
      <div className="col-lg-6">
        <div className="row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
          <div className="col col-sm-6 col-lg-7 col-xl-6">
            <a href="#" className="d-flex justify-content-center mb-4">
              <img
                className="logo-img"
                src="img/logo_web_page.jpg"
                alt="logo"
              />
            </a>
            <div className="text-center mb-5">
              <h3 className="fw-bold">Đăng nhập</h3>
            </div>
            <form>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bx bx-user"></i>
                </span>
                <input
                  type="text"
                  className="username-field form-control form-control-lg fs-6"
                  placeholder="Tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bx bx-lock-alt"></i>
                </span>
                <input
                  type="password"
                  className="password-field form-control form-control-lg fs-6"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-group mb-3 d-flex justify-content-between">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="formCheck"
                  />
                  <label
                    htmlFor="formCheck"
                    className="form-check-label text-secondary"
                  >
                    <small>Ghi nhớ</small>
                  </label>
                </div>
                <div>
                  <small>
                    <a href="#">Quên mật khẩu</a>
                  </small>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-lg w-100"
                id="btn-login"
                onClick={handleLogin}
              >
                Đăng nhập
              </button>
            </form>
            <div className="text-center">
              <small>
                Chưa có tài khoản?{" "}
                <Link to="/register" className="fw-bold">
                  Đăng ký
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
