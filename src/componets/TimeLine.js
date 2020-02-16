import React from "react";
import { Steps, Icon, Row, Col, Statistic } from "antd";
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
  return null;
}
function Averages({ PAPPI, PAPA, PA }) {
  return (
    <div>
      <Row type='flex' gutter={40} justify="start">
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

const SiaTimeLine = ({ periods, current, changePeriod }) => {
  console.log("periods: ", periods);
  // return null
  return (
    <div>
      <Steps
        current={current}
        direction="vertical"
        size="small"
        onChange={e => changePeriod(e)}
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
};
export default SiaTimeLine;
