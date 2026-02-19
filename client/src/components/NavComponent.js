import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Poker Order
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                首頁
              </Link>
            </li>
            {currentUser && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/poker">
                    撲克計算器
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    個人資料
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {!currentUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    註冊
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    登入
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                  登出
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavComponent;
