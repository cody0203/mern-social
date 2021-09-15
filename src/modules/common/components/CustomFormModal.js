import React from "react";
import styled from "styled-components";

import { Modal } from "antd";

const CustomFormModal = ({ visible, onCancel, children, title }) => {
  return (
    <ModalContainerStyled
      title={title}
      visible={visible}
      footer={null}
      onCancel={onCancel}
    >
      {children}
    </ModalContainerStyled>
  );
};

const ModalContainerStyled = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
`;

export default CustomFormModal;
