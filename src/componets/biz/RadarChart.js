import React from "react";
import { averagePerTopology } from "../../helpers/process";
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from "bizcharts";

class RadarChart extends React.Component {
  render() {
    // const [fundamentation, disciplinar, elective] = this.props.periods !== undefined ?  averagePerTopology(this.props.periods) : []

    const [fundamentation, disciplinar, elective]  = averagePerTopology(this.props.periods)
    console.log(averagePerTopology(this.props.periods))
    const data = [
      { item: "Fundamentacion", user: "name_user", score: fundamentation },
      { item: "Disciplinar", user: "name_user", score: disciplinar },
      { item: "Electiva", user: "name_user", score: elective },
    ];
    const cols = {
      score: {
        min: 0,
        max: 5
      }
    };

    return (
      <div>
        <Chart height={300} data={data}  scale={cols} forceFit>
          <Coord type="polar" radius={0.9} />
          <Axis
            name="item"
            line={null}
            tickLine={null}
            grid={{
              lineStyle: {
                lineDash: null
              },
              hideFirstLine: false
            }}
          />
          <Tooltip />
          <Axis
            name="score"
            line={null}
            tickLine={null}
            grid={{
              type: "circle",
              lineStyle: {
                lineDash: null
              },
              alternateColor: "rgba(0, 0, 0, 0.04)"
            }}
          />
          <Legend name="user" marker="circle" offset={30} />
          <Geom type="area" position="item*score" color="user" />
          <Geom type="line" position="item*score" color="user" size={2} />
          <Geom
            type="point"
            position="item*score"
            color="user"
            shape="circle"
            size={4}
            style={{
              stroke: "#fff",
              lineWidth: 1,
              fillOpacity: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default RadarChart;
