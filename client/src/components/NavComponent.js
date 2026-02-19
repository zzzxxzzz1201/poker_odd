import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import authService from "../services/auth.service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    navigate("/");
  };

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "zh-TW" ? "en" : "zh-TW");
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
                {t("nav.home")}
              </Link>
            </li>
            {currentUser && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/poker">
                    {t("nav.poker")}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    {t("nav.profile")}
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="btn btn-outline-info btn-sm me-2"
                onClick={toggleLang}
              >
                {i18n.language === "zh-TW" ? "EN" : "中"}
              </button>
            </li>
            {!currentUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    {t("nav.register")}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    {t("nav.login")}
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                  {t("nav.logout")}
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
