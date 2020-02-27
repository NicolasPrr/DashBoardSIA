import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Divider,
  Row,
  Col,
  Card,
  Switch,
  Button,
  Popconfirm,
  message
} from "antd";
import TimeLine from "../componets/TimeLine";
import CourseTable from "../componets/CourseTable";

import HistoryTable from "../componets/HistoryTable";
import Line from "../componets/nivo/Line";
import LineBiz from "../componets/biz/Line";
import RadarChart from "../componets/biz/RadarChart";
import PieChart from "../componets/biz/PieChart";
import PieChartCredits from "../componets/biz/PieChartCredits";
import Stats from "../componets/Stats";
import Advance from "../componets/biz/Advance";
import { getCredtisByType } from "../helpers/process";
import { Tabs } from "antd";
const { TabPane } = Tabs;

class MainView extends Component {
  SwitchCourses = () => (
    <div>
      Con materias perdidas ?
      <Switch onChange={e => this.changeLossCourses(e)} />
    </div>
  );
  SwitchCredits = () => (
    <div>
      Con creditos perdidos ?
      <Switch onChange={e => this.changeLossCredits(e)} />
    </div>
  );
  constructor(props) {
    super(props);
    this.state = {
      years: [],
      // periods: [],
      dataRadar: [],
      current: 0,
      countCoursesLoss: false,
      countCreditsLoss: false
    };
  }
  render() {
    const currentCourses = this.props.periods[this.state.current].courses;
    const types = getCredtisByType(
      this.props.periods,
      this.state.countCreditsLoss
    );
    const typesOk = getCredtisByType(this.props.periods, false);
    return (
      <div>
        <Divider />
        <Tabs onChange={null}>
          <TabPane tab="Todas las materias" key="1">
            <HistoryTable />
          </TabPane>
          <TabPane tab="Linea del tiempo" key="2">
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 5 }}>
                <TimeLine changeCurrent={this.changeCurrent} />
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 19 }}>
                <CourseTable
                  current={this.state.current}
                  courses={currentCourses}
                />
              </Col>
            </Row>
            <Popconfirm
              title="Sure?"
              onConfirm={() => {
                localStorage.clear();
                message.warning("Se ha borrado la información");
              }}
            >
              <Button type="danger">Borrar información almacenada</Button>
            </Popconfirm>
          </TabPane>
          {/* <TabPane tab="Analisis Nivo" key="3">
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ height: 250 }}>
                <Line />
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ height: 250 }}>
                <Line />
              </Col>
            </Row>
          </TabPane> */}
          <TabPane tab="Stats" key="4">
            <div style={{ background: "#ECECEC", padding: "30px" }}>
              <Stats />
              <Row gutter={[20, 20]}>
                <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                  <Card
                    title="Materias  vistas por tipologia"
                    size="small"
                    extra={<this.SwitchCourses />}
                  >
                    <PieChart
                      periods={this.props.periods}
                      countCoursesLoss={this.state.countCoursesLoss}
                    />
                  </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                  <Card size="small" title="Promedio por tipología">
                    <RadarChart periods={this.props.periods} />
                  </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                  <Card
                    size="small"
                    title="Cantidad de creditos por tipología"
                    extra={<this.SwitchCredits />}
                  >
                    <PieChartCredits types={types} />
                  </Card>
                </Col>
              </Row>
              <Row gutter={[20, 20]}>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <Card title="Avance" size="small">
                    <Advance types={typesOk} />
                  </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <Card size="small">
                    <LineBiz periods={this.props.periods} />
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
  changeCurrent = e => {
    this.setState({ current: e - 1 });
  };
  changeLossCourses = e => {
    this.setState({ countCoursesLoss: e });
  };
  changeLossCredits = e => {
    this.setState({ countCreditsLoss: e });
  };
}
const mapStateToProps = state => ({
  periods: state.periods
});
export default connect(mapStateToProps)(MainView);
