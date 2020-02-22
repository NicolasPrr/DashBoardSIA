import React from "react";
import { Modal, Select } from "antd";
const AddPeriodModal = ({ visible, onOk, quitModal, onChangeSelect }) => {
  const date = new Date();
  const year = date.getFullYear();
  let newPeriods = [];
  for (let i = 0; i < 4; i++) {
    newPeriods.push(year - 1 + i + "-1");
    newPeriods.push(year - 1 + i + "-2");
  }
  return (
    <Modal
      title="Agregar periodo academico"
      visible={visible}
      onCancel={quitModal}
      onOk={onOk}
    >
      <Select
        style={{ width: "100%" }}
        placeholder="Selecciona un periodo"
        onChange={e => onChangeSelect(e)}
      >
        {Object.keys(newPeriods).map(key => (
          <Select.Option key={key} value={newPeriods[key]}>
            {" "}
            {newPeriods[key]}
          </Select.Option>
        ))}
      </Select>
    </Modal>
  );
};

export default AddPeriodModal;
