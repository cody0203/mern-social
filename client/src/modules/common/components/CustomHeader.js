import React from "react";
import styled from "styled-components";

const CustomHeader = ({ children }) => {
  return <HeaderStyled>{children}</HeaderStyled>;
};

const HeaderStyled = styled.h1`
  text-align: center;
`;

export default CustomHeader;
