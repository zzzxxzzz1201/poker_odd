import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
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
      setMessage(err.response?.data?.message || "註冊失敗");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>註冊</h2>
          {message && <div className="alert alert-danger">{message}</div>}
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">使用者名稱</label>
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
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">密碼</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              註冊
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
