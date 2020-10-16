import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";

import "./Auth.scss";

export default (props) => {
  const AUTH_URL = "https://tager.dev.ozitag.com/api/auth/user";
  const USER_URL = "https://tager.dev.ozitag.com/api/tager/user/profile";

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (values) => {
    setLoading(true);

    const authResponse = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: 1,
        email: values.username,
        password: values.password,
      }),
    });

    if (authResponse.ok) {
      const authResponseJSON = await authResponse.json();
      const accessToken = authResponseJSON.data.accessToken;

      const userResponse = await fetch(USER_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (userResponse.ok) {
        const userResponseJSON = await userResponse.json();
        const user = JSON.stringify(userResponseJSON.data);

        props.setUser(user);
        localStorage.setItem("user", user);
        localStorage.setItem("accessToken", accessToken);
      } else {
        Modal.error({
          title: "Неизвестная ошибка",
        });
      }
    } else {
      Modal.error({
        title: "Неверные логин или пароль",
        content: "Проверьте данные и повторите попытку.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="form-wrapper">
      <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={(values) => onSubmitHandler(values)}>
        <Form.Item label="Логин" name="username" rules={[{ required: true, message: "Обязательное поле." }]}>
          <Input placeholder="user@ozitag.com" />
        </Form.Item>
        <Form.Item label="Пароль" name="password" rules={[{ required: true, message: "Обязательное поле." }]}>
          <Input.Password placeholder="user" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
