import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";
import React from "react";
import {parseObjects} from '../../helpers/process'

class Curved extends React.Component {

  render() {
    const ds = new DataSet();
    const data = parseObjects(this.props.periods)
    const dv = ds.createView().source(data);

    const title = {
      autoRotate:true, // 是否需要自动旋转，默认为 true
      textStyle: {
        fontSize: '12',
        textAlign: 'center',
        fill: '#999',
        fontWeight: 'bold',
      }, // 坐标轴文本属性配置
      position: 'center', // 标题的位置，**新增**
    }
    
    dv.transform({
      type: "fold", 
      fields: ["PAPA", "PA", "PAPPI"],
      key: "key",
      value: "value"
    });
    const scale={
      name:{
        alias: "Periodo académico"
      }
    }
    return (
      <div>
        <Chart height={400} data={dv} scale={scale}  forceFit>
          <Legend />
          <Axis name="name" title={title}/>
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="name*value"
            size={2}
            color={"key"}
            // shape={"smooth"}
          />
          <Geom
            type="point"
            position="name*value" 
            size={4}
            shape={"circle"}
            color={"key"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}
export default Curved;
