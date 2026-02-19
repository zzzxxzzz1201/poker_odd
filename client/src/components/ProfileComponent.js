import React from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProfileComponent = ({ currentUser }) => {
  const { t } = useTranslation();

  if (!currentUser) return <Navigate to="/login" />;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>{t("profile.title")}</h2>
          <div className="card">
            <div className="card-body">
              <p>
                <strong>{t("profile.username")}</strong> {currentUser.user.username}
              </p>
              <p>
                <strong>{t("profile.email")}</strong> {currentUser.user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
