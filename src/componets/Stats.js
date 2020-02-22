import React from "react";
import {connect} from 'react-redux'
import { Statistic, Card, Row, Col, Icon, Typography, Tooltip } from "antd";
const { Text } = Typography;
function getStats(periods) {
  let loss = 0,
    total = 0,
    bestCourse = {},
    worstCourse = {},
    counterBestCourses = 0,
    counterWorstCourses = 0;

  bestCourse["grade"] = 0;
  worstCourse["grade"] = 1000;
  periods.forEach(period => {
    period.courses.forEach(course => {
      total++;
      const grade = parseFloat(course[10]);
      if (grade < 3) loss++;
      if (grade === worstCourse.grade) {
        counterWorstCourses++;
        worstCourse.number = counterWorstCourses;
      }
      if (grade < worstCourse.grade) {
        worstCourse.data = [...course];
        worstCourse.grade = grade;
        worstCourse.number = 1;
      }
      if (grade === bestCourse.grade) {
        counterBestCourses++;
        bestCourse.number = counterBestCourses;
      }
      if (grade > bestCourse.grade) {
        counterBestCourses = 1;
        bestCourse.data = [...course];
        bestCourse.grade = grade;
        bestCourse.number = 1;
      }
    });
  });
  const result = {
    total: total,
    loss: loss,
    worstCourse: worstCourse,
    bestCourse: bestCourse
  };
  return result;
}
function FormatCourse(course) {
  console.log("Course: ", course.data[3]);
  return (
    <div>
      <Text>Curso: {course.data[3]}</Text>
      <br />
      <Text>Cantidad de materias con esta nota: {course.number}</Text>
      <br />
      <Text type={course.grade < 3 ? "danger" : "warning"}>
        Nota: {course.grade}
      </Text>
    </div>
  );
}
const Stats = ({ periods }) => {
  const { total, loss, worstCourse, bestCourse } = getStats(periods);
  return (
    <div style={{ padding: "10px" }}>
      <Row gutter={[20, 10]}>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <Tooltip title="No se tiene en cuenta las materias nivelatorias de inglés">
            <Card>
              <Statistic title="Cantidad de materias vistas" value={total} />
            </Card>
          </Tooltip>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <Card>
            <Statistic
              title="Cantidad de materias perdidas"
              value={loss}
              valueStyle={{ color: "#cf1322" }}
              prefix={<Icon type="frown" />}
              suffix={`/${total}`}
            />
          </Card>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <Card>
            <Statistic
              title="Nota más baja"
              formatter={FormatCourse}
              value={worstCourse}
              valueStyle={{ color: "#cf1322", fontSize: 15 }}
            />
          </Card>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <Card>
            <Statistic
              title="Nota más alta"
              formatter={FormatCourse}
              value={bestCourse}
              valueStyle={{ color: "#3f8600", fontSize: 15 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
const mapStateToProps =(state)=>(
  {
    periods: state.periods
  }

)
export default connect(mapStateToProps)(Stats);
