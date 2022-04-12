import React, { useEffect, useState } from "react";
import { Layout, Menu, Col, Row, Button, Space, Dropdown, message } from "antd";
import {
  LogoutOutlined,
  SettingFilled,
  ShoppingCartOutlined,
  SmileFilled,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
const { Header } = Layout;

export const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const [user, setUser] = useState(false);
  //sticky navgation
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });
  const cookies = new Cookies();
  const cookLogin = cookies.get("Login");
  useEffect(() => {
    if (cookLogin == null) {
      setUser(false);
    } else {
      setUser(true);
    }
  }, [cookLogin]);
  const isSticky = (e) => {
    const header = document.querySelector("#header-section");
    const scrollTop = window.scrollY;
    scrollTop >= 125
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };
  function handleMenuClick(e) {
    if (e.key == 1) {
      cookies.remove("Login", { path: "/" });
      setUser(false);
    }
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="2" icon={<SettingFilled />}>
        setting
      </Menu.Item>
      <Menu.Item key="1" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );
  const OnLoginUser = () => {
    return (
      <Dropdown.Button
        overlay={menu}
        placement="bottom"
        icon={
          <SmileFilled style={{ fontSize: "25px", borderRadius: "10px" }} />
        }
        style={{ margin: "15px 0 0 0 " }}
      ></Dropdown.Button>
    );
  };
  const Login = () => {
    return (
      <NavLink to={"/login"}>
        <Button
          type="dashed"
          shape="circle"
          icon={<UserOutlined />}
          size={30}
        />
      </NavLink>
    );
  };

  return (
    <>
      <Layout>
        <Header style={{ zIndex: 10, width: "100%" }} id="header-section">
          <Row>
            <Col span={2} offset={2}>
              <NavLink to="/">
                <img
                  className="logo"
                  src={"../../../CameraStore.png"}
                  alt="logo"
                ></img>
              </NavLink>
            </Col>
            <Col span={14} offset={2}>
              <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1" className="menu-selected">
                  <NavLink to="/">Trang chủ</NavLink>
                </Menu.Item>

                <Menu.Item key="2" className="menu-selected">
                  <NavLink to="/san-pham">Sản phẩm</NavLink>
                </Menu.Item>

                <Menu.Item key="3" className="menu-selected">
                  <NavLink to="/thong-tin">Thông tin</NavLink>
                </Menu.Item>
              </Menu>
            </Col>
            <Col span="4">
              <Space>
                <NavLink to={"/gio-hang"}>
                  <Button
                    type="link"
                    shape="round"
                    icon={<ShoppingCartOutlined />}
                    size={30}
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Giỏ hàng ({state.length})
                  </Button>
                </NavLink>
                {user ? <OnLoginUser /> : <Login />}
              </Space>
            </Col>
          </Row>
        </Header>
      </Layout>
    </>
  );
};
