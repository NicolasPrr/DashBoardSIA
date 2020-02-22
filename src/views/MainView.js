import React, { Component } from "react";
import { connect } from "react-redux";
import { Divider, Button, Row, Col, Card } from "antd";
import TimeLine from "../componets/TimeLine";
import HistoryTable from "../componets/HistoryTable";
import Line from "../componets/nivo/Line";
import LineBiz from "../componets/biz/Line";
import RadarChart from "../componets/biz/RadarChart";
import PieChart from "../componets/biz/PieChart";
import PieChartCredits from "../componets/biz/PieChartCredits";
import Stats from "../componets/Stats";
import { Tabs } from "antd";
const { TabPane } = Tabs;

class MainView extends Component {
  PrintButton = () => {
    return <Button type="primary"> Imprimir</Button>;
  };
  constructor(props) {
    super(props);
    this.state = {
      years: [],
      // periods: [],
      dataRadar: [],
      current: 0
    };
  }

  render() {
    return (
      <div>
        <Divider />
        <Tabs onChange={null}>
          <TabPane tab="Todas las materias" key="1">
            <HistoryTable />
          </TabPane>
          <TabPane tab="Linea del tiempo" key="2">
            <TimeLine
              current={this.state.current}
              changePeriod={this.changePeriod}
            />
          </TabPane>
          <TabPane tab="Analisis Nivo" key="3">
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ height: 250 }}>
                <Line />
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ height: 250 }}>
                <Line />
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Stats" key="4">
            <div style={{ background: "#ECECEC", padding: "30px" }}>
              <Stats />
              <Row gutter={[20, 20]}>
                <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                  <Card title="Materias  vistas por tipologia" size="small">
                    <PieChart periods={this.props.periods} />
                  </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                  <Card size="small" title="Promedio por tipología">
                    <RadarChart periods={this.props.periods} />
                  </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                  <Card size="small" title="Cantidad de creditos por tipología">
                    <PieChartCredits periods={this.props.periods} />
                  </Card>
                </Col>
              </Row>
              <Row gutter={[20, 20]}>
                <Col>
                  <Card title="">
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
}
const mapStateToProps = state => ({
  periods: state.periods
});
export default connect(mapStateToProps)(MainView);
