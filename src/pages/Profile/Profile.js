import React, { useState } from "react";
import { Avatar, Button, Modal } from "antd";

import "./Profile.scss";

export default (props) => {
  const LOGOUT_URL = "https://tager.dev.ozitag.com/api/tager/user/profile/logout";
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(props.user);

  const onLogoutHandler = async () => {
    setLoading(true);

    const response = await fetch(LOGOUT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (response.ok) {
      props.setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    } else {
      Modal.error({
        title: "Неизвестная ошибка",
      });
    }

    setLoading(false);
  };

  return (
    <div className="profile-wrapper">
      <Avatar size={128} src={user.avatar || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />
      <h1 className="profile-wrapper__username">{user.name}</h1>
      <p className="profile-wrapper__email">{user.email}</p>
      <Button onClick={() => onLogoutHandler()} loading={loading}>
        Выйти
      </Button>
    </div>
  );
};
