import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setPeriods, calculateAll,setCredits } from "./redux/actions/period";
import { Layout } from "antd";
import Header from "./componets/Header";
import Footer from "./componets/Footer";
import MainInput from "./views/MainInput";
import MainView from "./views/MainView";
import setData from "./helpers/history";
import "./App.css";
const { Content } = Layout;

const Switcher = ({ type, malla_function, history }) => {
  console.log("history:", history);
  if (type === "input") return <MainInput onSuccess={malla_function} />;
  if (type === "malla") return <MainView />;
  // if (type === "malla") return <MainView periods={[...history.periods]} />;
  return <div>Nothing to do :( :( : )</div>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "input",
      // type: "malla",
      history: null,
      periods: []
    };
  }

  render() {
    return (
      <div>
        <Layout>
          <Content>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <Switcher
                type={this.state.type}
                malla_function={this.getData}
                history={this.state.history}
              />
            </div>
          </Content>
          <Footer />
        </Layout>
      </div>
    );
  }
  getData = data => {
    let history = setData(data);
    console.log("first history:", history);
    this.setState({ history: history }, () => {
      this.props.setPeriods(history.periods);
      this.props.calculateAll();
      this.props.setCredits(history.requiredCredits)
      this.setState({ type: "malla" });
    });
  };
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { setPeriods: setPeriods, calculateAll: calculateAll, setCredits: setCredits },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(App);
