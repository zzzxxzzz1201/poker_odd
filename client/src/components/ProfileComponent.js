import React from "react";
import { Navigate } from "react-router-dom";

const ProfileComponent = ({ currentUser }) => {
  if (!currentUser) return <Navigate to="/login" />;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>個人資料</h2>
          <div className="card">
            <div className="card-body">
              <p>
                <strong>使用者名稱：</strong> {currentUser.user.username}
              </p>
              <p>
                <strong>Email：</strong> {currentUser.user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
