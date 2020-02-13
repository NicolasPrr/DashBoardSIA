import React from "react";
import { Layout } from "antd";
import Header from './componets/Header'


const { Content, Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Header/>
          <Content>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              Content
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
