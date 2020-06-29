import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import get from "lodash/get";

const PrimaryButton = ({
  children,
  disabled = false,
  loading,
  action,
  htmlType = "button",
}) => {
  return (
    <PrimaryButtonStyled
      disabled={disabled}
      loading={loading}
      onClick={action}
      htmlType={htmlType}
    >
      {children}
    </PrimaryButtonStyled>
  );
};

const PrimaryButtonStyled = styled(Button)`
  background-color: ${({ theme }) => get(theme, "colors.primary")};
`;

export default PrimaryButton;
