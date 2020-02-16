import React from "react";
import { Table } from "antd";

const columns = [
  { title: "Periodo academico", dataIndex: "name", key: "name" },
  { title: "PAPA", dataIndex: "PAPA", key: "PAPA" },
  { title: "PA", dataIndex: "PA", key: "PA" },
  { title: "PAPPI", dataIndex: "PAPPI", key: "PAPI" }
];
const sub_columns = [
  { title: "Codigo", dataIndex: "code", key: "code" },
  { title: "Nombre", dataIndex: "name", key: "name",ellipsis: true },
  { title: "Tipo", dataIndex: "type", key: "type" },
  { title: "Creditos", dataIndex: "credits", key: "credits" },
  { title: "Nota", dataIndex: "grade", key: "grade" }
];
function getTypeCourse(str) {
  if (str === "E") return "Nivelación";
  if (str === "C") return "Disciplinar obligatoria";
  if (str === "O") return "Fund. optativa";
  if (str === "T") return "Disciplinar optativa";
  if (str === "L") return "Electiva";
  if (str === "B") return "Fund. obligatoria";
}
function buildCourses(courses) {
  let finalCourses = [];
  courses.forEach(course => {
    finalCourses.push({
      name: course[3],
      code: course[1],
      type: getTypeCourse(course[7]),
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
      style={{margin:5}}
      rowKey={record => record.code}
    />
  );
}
const HistoryTable = ({ periods }) => {
  return (
    <Table
      bordered
      size='small'
      columns={columns}
      dataSource={periods}
      pagination={false}
      expandedRowRender={NestedTable}
      scroll={{x: 350}}
      rowKey={record => record.name}
    />
  );
};

export default HistoryTable;
