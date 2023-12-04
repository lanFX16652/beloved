import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Layout, Space, Menu } from "antd";
import classes from "./MainLayout.module.css";
const { Header, Footer, Content } = Layout;

const headerStyle = {
  textAlign: "center",
  //   color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "white",
};
const contentStyle = {
  // textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "black",
  // backgroundColor: "#108ee9",
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "black",
};

const MainLayout = () => {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
      size={[0, 48]}
    >
      <Layout>
        <Header style={headerStyle}>
          <div className={classes["navbar-wrapper"]}>
            <div>
              <NavLink to="/">
                <span>Home</span>
              </NavLink>
              <NavLink to="/shoppage">
                <span>Shop</span>
              </NavLink>
            </div>

            <div>
              <span>Boutique</span>
            </div>

            <div>
              <NavLink to="/login">
                <span>Login</span>
              </NavLink>
            </div>
          </div>
        </Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <Footer style={footerStyle}>
          <div clasName={classes["footer-wrapper"]}>
            <div>
              <h4>FREE SHIPPING</h4>
            </div>
            <div>
              <h4>CONTACT US</h4>
            </div>
          </div>
        </Footer>
      </Layout>
    </Space>
  );
};

export default MainLayout;
