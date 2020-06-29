import React from "react";
import styled from "styled-components";
import get from "lodash/get";

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  .icon {
    color: ${({ theme }) => get(theme, "colors.warning")};
    margin-right: 16px;

    svg {
      font-size: 24px;
    }
  }

  .title {
    font-size: 16px;
    font-weight: 500;
  }
`;

const CustomModalHeader = ({ children }) => {
  return <HeaderStyled>{children}</HeaderStyled>;
};

export default CustomModalHeader;
