import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OAuthCallbackComponent = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        localStorage.setItem("user", JSON.stringify(parsed));
        setCurrentUser(parsed);
        navigate("/poker");
      } catch {
        navigate("/login?error=google_failed");
      }
    } else {
      navigate("/login?error=google_failed");
    }
  }, [searchParams, navigate, setCurrentUser]);

  return (
    <div className="container py-5 text-center">
      <p>{t("oauth.processing")}</p>
    </div>
  );
};

export default OAuthCallbackComponent;
