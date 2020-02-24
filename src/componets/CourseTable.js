import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Popconfirm, Divider, Button } from "antd";
import AddCourseModal from "./AddCourseModal";
import { buildCourses } from "./HistoryTable";
import { deleteCourse, addCourse } from "../redux/actions/period";

class CourseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  quitModal = () => {
    this.setState({ visible: false });
  };
  onOkModal = courseInput => {
    this.quitModal();
    const course = [
      "",
      courseInput.code,
      courseInput.code,
      courseInput.name,
      0,
      0,
      0,
      courseInput.typology,
      courseInput.credits,
      0,
      courseInput.grade
    ];
    this.props.addCourse(this.props.current, course);
  };
  render() {
    const { courses, deleteCourse, current } = this.props;
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
      {
        title: "Creditos",
        dataIndex: "credits",
        key: "credits",
        editable: true
      },
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
              onConfirm={() => {
                deleteCourse(current, record.code);
              }}
            >
              <a href="#/">Borrar</a>
            </Popconfirm>
          </span>
        )
      }
    ];
    return (
      <React.Fragment>
        <Table
          size="small"
          columns={sub_columns}
          dataSource={finalCourses}
          rowKey={record => record.code}
        />
        <Button
          onClick={() => {
            this.setState({ visible: true });
          }}
        >
          Agregar curso
        </Button>
        <AddCourseModal
          quitModal={this.quitModal}
          visible={this.state.visible}
          onOkModal={this.onOkModal}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { deleteCourse: deleteCourse, addCourse: addCourse },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(CourseTable);
