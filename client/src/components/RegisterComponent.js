import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import authService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authService.register(username, email, password);
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || t("register.failed"));
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>{t("register.title")}</h2>
          {message && <div className="alert alert-danger">{message}</div>}
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">{t("register.username")}</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">{t("register.email")}</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">{t("register.password")}</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {t("register.submit")}
            </button>
          </form>
          <div className="d-flex align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="mx-3 text-muted">{t("register.or")}</span>
            <hr className="flex-grow-1" />
          </div>
          <a
            href="http://localhost:8080/api/user/google"
            className="btn btn-outline-danger w-100"
          >
            {t("register.googleRegister")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
