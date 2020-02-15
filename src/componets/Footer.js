import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;
const CustomFooter = () => {
  return (
    <Footer style={{ textAlign: "center", height: '100%' }}>
      Esto no es una web oficial desarrollada por la Universidad Nacional de Colombia
    </Footer>
  );
};
export default CustomFooter;
