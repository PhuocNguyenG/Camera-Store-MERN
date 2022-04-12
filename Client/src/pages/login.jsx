import React, { useRef, useState } from "react";
import { Button, Checkbox, Col, Form, Input, Layout, message, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/action";
import axios from "axios";
import Cookies from "universal-cookie";
export function Login() {
  const username = useRef("username");
  const password = useRef("password");
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [disable, setDisable] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (value) => {
    axios
      .post("http://localhost:5000/user/login", user)
      .then(async (response) => {
        setDisable(true);
        await message.success("Đăng nhập thành công!");
        cookies.set("Login", response, { path: "/" });
        console.log("Login success with idUser:" + response);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        message.warn("Sai tài khoản hoặc chưa đăng ký!");
        console.log(err.response);
      });
  };

  return (
    <>
      <Layout style={{ height: "100vh", margin: "auto" }}>
        <Row justify={"center"} style={{ marginTop: "30px" }}>
          <div className="box-login">
            <div
              style={{
                fontSize: "25px",
                fontWeight: "500",
                textAlign: "center",
                marginBottom: "10px",
                fontFamily: "monospace",
              }}
            >
              Đăng nhập
            </div>
            <Form
              name="normal_login"
              onFinish={handleSubmit}
              className="login-form"
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Hãy nhập tên tài khoản" }]}
              >
                <Input
                  name="username"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Tài khoản"
                  ref={username}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
              >
                <Input
                  name="password"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Mật khẩu"
                  ref={password}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Ghi nhớ</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Quên mật khẩu
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  disabled={disable}
                >
                  Đăng nhập
                </Button>
                <div style={{ float: "right" }}>
                  Hoặc
                  <NavLink to="/register"> Đăng ký!</NavLink>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Row>
      </Layout>
    </>
  );
}
