import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Popconfirm, Divider } from "antd";
import { buildCourses } from "./HistoryTable";
import { deleteCourse } from "../redux/actions/period";

const CourseTable = ({ courses, deleteCourse, current }) => {
  const finalCourses = buildCourses(courses);
  const sub_columns = [
    { title: "Codigo", dataIndex: "code", key: "code", editable: true },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      editable: true
    },
    { title: "Tipo", dataIndex: "type", key: "type", editable: true },
    { title: "Creditos", dataIndex: "credits", key: "credits", editable: true },
    { title: "Nota", dataIndex: "grade", key: "grade", editable: true },
    {
      title: "Acción",
      key: "action",
      render: (text, record) => (
        <span>
          <a href="#/">Editar</a>
          <Divider type="vertical" />
          <Popconfirm
            title="Borrar?"
            onConfirm={() =>{ 
              deleteCourse(current, record.code)
            }}
          >
            <a href="#/">Borrar</a>
          </Popconfirm>
        </span>
      )
    }
  ];
  return (
    <Table
      size="small"
      columns={sub_columns}
      dataSource={finalCourses}
      rowKey={record => record.code}
    />
  );
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ deleteCourse: deleteCourse }, dispatch);
};
export default connect(null, mapDispatchToProps)(CourseTable);
