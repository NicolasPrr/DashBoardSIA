import React from "react";
import { connect } from "react-redux";
import { Steps, Icon, Row, Col, Statistic, message } from "antd";
import AddPeriodModal from "./AddPeriodModal";
import { bindActionCreators } from "redux";
import { addPeriod, calculateAll } from "../redux/actions/period";
const { Step } = Steps;
function ReadyIcon() {
  return <Icon type="flag" style={{ fontSize: "20px" }} />;
}
function AddIcon() {
  return <Icon type="more" style={{ fontSize: "20px" }} />;
}
function SmileIcon() {
  return (
    <Icon
      type="smile"
      style={{ fontSize: "20px" }}
      theme="twoTone"
      twoToneColor="#52c41a"
    />
  );
}
function SadIcon() {
  return <Icon type="frown" style={{ fontSize: "20px" }} />;
}
function MehIcon() {
  return (
    <Icon
      type="meh"
      style={{ fontSize: "20px" }}
      theme="twoTone"
      twoToneColor="#505D78"
    />
  );
}
function SelectIcon({ PAPPI }) {
  if (PAPPI < 3) return <SadIcon />;
  if (PAPPI < 4) return <MehIcon />;
  if (PAPPI < 5) return <SmileIcon />;

  return <SadIcon />;
}
function Averages({ PAPPI, PAPA, PA }) {
  return (
    <div>
      <Row type="flex" gutter={40} justify="start">
        <Col>
          <Statistic
            title="PAPA"
            value={PAPA}
            valueStyle={{ color: "#7285AB" }}
          />
        </Col>
        <Col>
          <Statistic title="PAPPI" value={PAPPI} />
        </Col>
        <Col>
          <Statistic title="PA" value={PA} />
        </Col>
      </Row>
    </div>
  );
}
class SiaTimeLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      visible: false,
      toAdd: null
    };
  }
  render() {
    const periods = this.props.periods;

    return (
      <div>
        <AddPeriodModal
          visible={this.state.visible}
          quitModal={this.quitModal}
          onChangeSelect={this.onChangeSelect}
          onOk={this.addPeriod}
        />
        <Steps
          current={this.state.current}
          direction="vertical"
          size="small"
          onChange={e => this.changePeriod(e)}
        >
          <Step title="Inicio" icon={<ReadyIcon />} />
          {Object.keys(periods).map(key => (
            <Step
              title={periods[key].name}
              // description={`PAPA: ${periods[key].PAPA} \nPAPPI: ${periods[key].PAPPI}  PA: ${periods[key].PA}`}
              description={
                <Averages
                  PAPA={periods[key].PAPA}
                  PAPPI={periods[key].PAPPI}
                  PA={periods[key].PA}
                />
              }
              key={key}
              icon={<SelectIcon PAPPI={periods[key].PAPPI} />}
            />
          ))}
          <Step
            title="Agregar periodo academico"
            icon={<AddIcon />}
            status="finish"
          />
        </Steps>
      </div>
    );
  }
  changePeriod = e => {
    this.setState({ current: e });
    const length = this.props.periods.length;
    if (e === length + 1) this.activateModal();
    if (e > 0 && e < length + 1) this.props.changeCurrent(e);
  };
  activateModal = () => {
    this.setState({ visible: true });
  };
  quitModal = () => {
    this.setState({ visible: false });
  };
  onChangeSelect = e => {
    this.setState({ toAdd: e });
  };
  addPeriod = () => {
    if (this.state.toAdd === null) {
      message.error("No ha seleccionado un periodo");
      return;
    }
    this.quitModal();
    this.props.addPeriodRedux(this.state.toAdd);
    this.props.calculateAll();
  };
}
const mapStateToProps = state => ({
  periods: state.periods
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { addPeriodRedux: addPeriod, calculateAll: calculateAll },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(SiaTimeLine);
