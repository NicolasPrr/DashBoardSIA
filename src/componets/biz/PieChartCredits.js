import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  Guide
} from "bizcharts";
import DataSet from "@antv/data-set";


class Donut extends React.Component {
  render() {
    const { DataView } = DataSet;
    const { Html } = Guide;
    const types = this.props.types
    console.log("types:", types);
    const data = [
      {
        item: "Electivas",
        count: types.elective
      },
      {
        item: "Fund obg",
        count: types.fundObli
      },
      {
        item: "Fund  optativa",
        count: types.fundOpt
      },
      {
        item: "Disciplinar obligatoria",
        count: types.dispObli
      },
      {
        item: "Disciplinar optativa",
        count: types.dispOpt
      }
    ];
    const total =
      types.dispOpt +
      types.dispObli +
      types.fundOpt +
      types.fundObli +
      types.elective;
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = (parseFloat(val) * 100).toFixed(2) + "%";
          return val;
        }
      }
    };
    return (
      <div>
        <Chart height={300} data={dv} scale={cols} forceFit>
          <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Legend
            position="bottom"
            // offsetY={-window.innerHeight / 2 + 120}
            // offsetX={-100}
          />
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Guide>
            <Html
              position={["50%", "50%"]}
              html={`<div>Total: ${total}</div>`}
              //   html='<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">主机<br><span style="color:#262626;font-size:2.5em">{}</span>台</div>'
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              "item*count",
              (item, percent) => {
                // percent = percent * 100 + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                return item.point.item + ":   " + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Donut;
