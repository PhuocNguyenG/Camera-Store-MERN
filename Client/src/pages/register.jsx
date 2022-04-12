import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 0,
    },
  },
};
export function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    customerName: "",
    phone: "",
    email: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );
  const onFinish = () => {
    axios
      .post("http://localhost:5000/user/register", user)
      .then(() => {
        console.log("register success");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [form] = Form.useForm();

  return (
    <>
      <Layout style={{ height: "100vh", margin: "auto" }}>
        <Row justify={"center"} style={{ marginTop: "30px" }}>
          <div className="box-register">
            <div
              style={{
                fontSize: "25px",
                fontWeight: "500",
                textAlign: "center",
                marginBottom: "10px",
                fontFamily: "monospace",
              }}
            >
              Đăng ký
            </div>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                prefix: "84",
              }}
              scrollToFirstError
            >
              <Form.Item
                label="Tên tài khoản"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tài khoản",
                  },
                ]}
              >
                <Input
                  defaultValue={user.username}
                  name="username"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                value=""
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "Đây không phải là email!",
                  },
                  {
                    required: true,
                    message: "Hãy nhập E-mail!",
                  },
                ]}
              >
                <Input
                  value={user.email}
                  name="email"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  value={user.password}
                  name="password"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Xác nhận mật khẩu"
                value=""
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Hãy xác nhận mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Hai mật khẩu không giống nhau!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="nickname"
                label="Tên"
                value=""
                tooltip="Chúng tôi sẽ gọi bạn bằng ?"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên của bạn!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  value={user.customerName}
                  name="customerName"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                rules={[{ required: true, message: "Hãy nhập số điện thoại!" }]}
              >
                <Input
                  name="phone"
                  addonBefore={prefixSelector}
                  style={{ width: "100%" }}
                  value={user.phone}
                  onChange={handleChange}
                />
              </Form.Item>

              <Checkbox style={{ marginLeft: "33%", marginBottom: "10px" }}>
                Tôi chấp nhận <a href="">điều khoản</a>
              </Checkbox>

              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
              >
                Đăng ký
              </Button>
              <div style={{ float: "right" }}>
                Đã có tài khoản?
                <NavLink to="/login"> Đăng nhập!</NavLink>
              </div>
            </Form>
          </div>
        </Row>
      </Layout>
    </>
  );
}
