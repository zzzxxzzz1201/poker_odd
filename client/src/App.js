import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavComponent from "./components/NavComponent";
import HomeComponent from "./components/HomeComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import ProfileComponent from "./components/ProfileComponent";
import PokerCalculator from "./components/poker/PokerCalculator";
import OAuthCallbackComponent from "./components/OAuthCallbackComponent";

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  return (
    <div>
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<HomeComponent currentUser={currentUser} />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route
          path="/login"
          element={<LoginComponent setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/profile"
          element={<ProfileComponent currentUser={currentUser} />}
        />
        <Route
          path="/oauth/callback"
          element={<OAuthCallbackComponent setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/poker"
          element={
            currentUser ? <PokerCalculator /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
