import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomeComponent = ({ currentUser }) => {
  const { t } = useTranslation();

  return (
    <div className="container py-5">
      <div className="text-center">
        <h1>{t("home.title")}</h1>
        <p className="lead mt-3">{t("home.subtitle")}</p>
        {!currentUser ? (
          <div className="mt-4">
            <p>{t("home.loginPrompt")}</p>
            <Link to="/login" className="btn btn-primary me-2">
              {t("home.login")}
            </Link>
            <Link to="/register" className="btn btn-outline-primary">
              {t("home.register")}
            </Link>
          </div>
        ) : (
          <div className="mt-4">
            <Link to="/poker" className="btn btn-primary btn-lg">
              {t("home.start")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeComponent;
