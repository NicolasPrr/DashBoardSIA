import React from "react";
import { Table } from "antd";

const columns = [
  { title: "Periodo academico", dataIndex: "name", key: "name" },
  { title: "PAPA", dataIndex: "PAPA", key: "PAPA" },
  { title: "PA", dataIndex: "PA", key: "PAPA" },
  { title: "PAPPI", dataIndex: "PAPPI", key: "PAPI" }
];
const sub_columns = [
  { title: "Codigo", dataIndex: "code", key: "code" },
  { title: "Nombre", dataIndex: "name", key: "name" },
  { title: "tipo", dataIndex: "type", key: "type" },
  { title: "creditos", dataIndex: "credits", key: "credits" },
  { title: "nota", dataIndex: "grade", key: "grade" }
];
function buildCourses(courses) {
  let finalCourses = [];
  courses.forEach(course => {
    finalCourses.push({
      name: course[3],
      code: course[2],
      type: course[7],
      credits: course[8],
      grade: course[10]
    });
  });
  return finalCourses;
}
function NestedTable(record) {
  const finalCourses = buildCourses(record.courses);
  return (
    <Table
      size="small"
      columns={sub_columns}
      dataSource={finalCourses}
      pagination={false}
    />
  );
}
const HistoryTable = ({ periods }) => {
  return (
    <Table
      size="small"
      columns={columns}
      dataSource={periods}
      pagination={false}
      expandedRowRender={NestedTable}
      scroll={{x: 350}}
    />
  );
};

export default HistoryTable;
