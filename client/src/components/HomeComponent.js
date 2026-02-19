import React from "react";
import { Link } from "react-router-dom";

const HomeComponent = ({ currentUser }) => {
  return (
    <div className="container py-5">
      <div className="text-center">
        <h1>德州撲克機率計算器</h1>
        <p className="lead mt-3">計算勝率與牌型機率，提升你的撲克策略</p>
        {!currentUser ? (
          <div className="mt-4">
            <p>請先登入或註冊以使用撲克計算器</p>
            <Link to="/login" className="btn btn-primary me-2">
              登入
            </Link>
            <Link to="/register" className="btn btn-outline-primary">
              註冊
            </Link>
          </div>
        ) : (
          <div className="mt-4">
            <Link to="/poker" className="btn btn-primary btn-lg">
              開始計算
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeComponent;
