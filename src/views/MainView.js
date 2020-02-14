import React, { Component } from "react";
import {
  calculatePAPPI,
  calculatePAPA,
  averagePerTopology
} from "../helpers/process";
import TimeLine from "../componets/TimeLine";
import { Divider, Row, Col } from "antd";

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: [],
      periods: [],
      dataRadar: [],
      current: 0
    };
  }
  componentDidMount() {
    console.log("periodsss:", this.props.periods);
    this.calculateAll(this.props.periods);
  }

  render() {
    return (
      <div>
        <Divider />
        <Row>
          <Col span={4}>
            <TimeLine
              periods={this.state.periods}
              current={this.state.current}
              changePeriod={this.changePeriod}
            />
          </Col>
          <Col>col-asdad12</Col>
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
