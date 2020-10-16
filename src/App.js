import React, { useState } from "react";

import "./App.scss";

import Logo from "./components/Logo/Logo";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";

export default () => {
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  return (
    <div className="container">
      {user ? (
        <Profile user={user} setUser={setUser} />
      ) : (
        <React.Fragment>
          <Logo />
          <Auth setUser={setUser} />
        </React.Fragment>
      )}
    </div>
  );
};
