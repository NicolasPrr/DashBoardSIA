import React, { Component } from "react";
import {
  calculatePAPPI,
  calculatePAPA,
  averagePerTopology
} from "../helpers/process";
import TimeLine from "../componets/TimeLine";
import HistoryTable from "../componets/HistoryTable";
import { Divider, Row, Col } from "antd";
import { data } from "../helpers/datatest";
import { Tabs } from "antd";
const { TabPane } = Tabs;

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: [],
      // periods: [],
      periods: data,
      dataRadar: [],
      current: 0
    };
  }
  componentDidMount() {
    console.log("periodsss:", this.props.periods);
    // this.calculateAll(this.props.periods);
    this.calculateAll(this.state.periods);
  }

  render() {
    return (
      <div>
        <Divider />
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <TimeLine
              periods={this.state.periods}
              current={this.state.current}
              changePeriod={this.changePeriod}
            />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 19 }}>
            <Tabs onChange={null}>
              <TabPane tab="Resumen" key="1">
                <HistoryTable periods={this.state.periods} />
              </TabPane>
              <TabPane tab="Table" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
  changePeriod = e => {
    this.setState({ current: e });
  };
  calculateAll(per) {
    var periods = [];
    var years = [];
    periods = [...per];
    this.setState({ years: [], periods: [] });
    var creditsPerScore = 0;
    var totalCredits = 0;
    var result;
    var fundamentation;
    var disciplinar;
    var elective;
    var radar;
    let lost = {};
    var creditsPerScorePA = 0;
    let creditsPA = 0;

    //nota por tipologia (Electiva, obligatoria fundamental, optativa fundamental, disciplinar obligatoria y optativa disciplinar)
    //calculo del papi, pappa
    // lost["hey"] =" hola"

    for (var i = 0; i < periods.length; i++) {
      const PAPPI = calculatePAPPI(periods[i].courses);
      periods[i].PAPPI = PAPPI;

      result = calculatePAPA(
        periods[i].courses,
        creditsPerScore,
        totalCredits,
        lost,
        creditsPerScorePA,
        creditsPA
      );
      periods[i].PAPA = result[0];
      periods[i].PA = result[6];
      creditsPerScore = result[1];
      totalCredits = result[2];
      lost = result[3];
      creditsPerScorePA = result[4];
      creditsPA = result[5];
      // console.log("result", JSON.stringify(result[3]))
    }

    [fundamentation, disciplinar, elective] = averagePerTopology(periods);

    radar = [
      { name: "Fundamentacion", average: parseFloat(fundamentation) },
      { name: "Disciplinar", average: parseFloat(disciplinar) },
      { name: "Electiva", average: parseFloat(elective) }
    ];
    this.setState({ dataRadar: radar });
    this.setState({ periods: periods });
    for (i = 0; i < periods.length; i++) {
      if (
        years.length === 0 ||
        periods[i].name.split("-")[0] !== years[years.length - 1].year
      ) {
        years.push({
          year: periods[i].name.split("-")[0],
          periods: []
        });
        years[years.length - 1].periods.push(periods[i]);
      } else if (
        periods[i].name.split("-")[0] === years[years.length - 1].year
      ) {
        years[years.length - 1].periods.push(periods[i]);
      }

      this.setState({ years: years });
    }
  }
}
