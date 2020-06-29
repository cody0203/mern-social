import React from "react";
import { Modal, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

import CustomModalHeader from "./CustomModalHeader";

const CustomDeleteConfirmModal = ({
  visible,
  onOk,
  onCancel,
  title,
  desc,
  loading,
}) => {
  return (
    <DeleteModalStyled
      visible={visible}
      maskClosable={false}
      closable={false}
      closeIcon={null}
      width={400}
      footer={null}
    >
      <CustomModalHeader>
        <InfoCircleOutlined className="icon" />
        <span className="title">{title}</span>
      </CustomModalHeader>

      <DescStyled>{desc}</DescStyled>

      <ButtonGroupStyled>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" onClick={onOk} loading={loading}>
          Confirm
        </Button>
      </ButtonGroupStyled>
    </DeleteModalStyled>
  );
};

const DeleteModalStyled = styled(Modal)`
  .ant-modal-header,
  .ant-modal-footer {
    border: none;
  }
`;

const ButtonGroupStyled = styled.div`
  margin-top: 24px;
  text-align: right;

  .ant-btn {
    &:first-child {
      margin-right: 16px;
    }
  }
`;

const DescStyled = styled.p`
  margin: 16px 0;
`;

export default CustomDeleteConfirmModal;
