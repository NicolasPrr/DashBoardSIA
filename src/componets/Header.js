import React from "react";
import { Menu, Layout } from "antd";
const { Header } = Layout;

const CustomHeader = () => {
  return (
    <div>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">Formulario</Menu.Item>
          <Menu.Item key="2"> Mi historia </Menu.Item>
          <Menu.Item key="3">any ideas?</Menu.Item>
        </Menu>
      </Header>
    </div>
  );
};
export default CustomHeader;
