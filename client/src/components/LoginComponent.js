import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import authService from "../services/auth.service";

const LoginComponent = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      setCurrentUser(response.data);
      navigate("/poker");
    } catch (err) {
      setMessage(err.response?.data?.message || t("login.failed"));
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>{t("login.title")}</h2>
          {message && <div className="alert alert-danger">{message}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">{t("login.email")}</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">{t("login.password")}</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {t("login.submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
