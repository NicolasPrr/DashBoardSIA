import React from "react";
import { Modal, Form, Input, InputNumber, Select } from "antd";

const { Option } = Select;
const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Agregar curso"
          okText="Crear"
          cancelText="Cancelar"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Codigo">
              {getFieldDecorator("code", {
                rules: [
                  {
                    required: true,
                    message: "Please input the course code!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Nombre">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Please input the course name!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Select" hasFeedback>
              {getFieldDecorator("typology", {
                rules: [{ required: true, message: "Please select typology!" }]
              })(
                <Select placeholder="Please select a typology">
                  <Option value="E">Nivelación</Option>
                  <Option value="C">DISCIPLINAR OBLIGATORIA</Option>
                  <Option value="O">FUND. OPTATIVA</Option>
                  <Option value="T">DISCIPLINAR OPTATIVA</Option>
                  <Option value="L">LIBRE ELECCIÓN</Option>
                  <Option value="B">FUND. OBLIGATORIA</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Creditos">
              {getFieldDecorator("credits", { initialValue: 3 })(
                <InputNumber min={1} max={10} />
              )}
            </Form.Item>
            <Form.Item label="Nota">
              {getFieldDecorator("grade", { initialValue: 3 })(
                <InputNumber min={1} max={10} step={0.1} />
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class AddCourseModal extends React.Component {
  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log("Received values of form: ", values);
      // form.resetFields();
      this.props.onOkModal(values)
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.props.visible}
          onCancel={this.props.quitModal}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
export default AddCourseModal;
