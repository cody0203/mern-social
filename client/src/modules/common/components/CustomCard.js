import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const CustomCard = ({ children, ...rest }) => {
  return <CustomCardStyled {...rest}>{children}</CustomCardStyled>;
};
const CustomCardStyled = styled(Card)`
  max-width: ${({ width }) => `${width ? `${width}px` : '100%'}`};
  margin: auto;
  background-color: ${({ background }) => `${background ? `${background}` : 'transparent'}`};

  .ant-card-body {
    padding: ${({ $customPadding }) => ($customPadding ? $customPadding : '16px 24px')};
  }
`;

export default CustomCard;
