import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const CustomCard = ({ children, width, ...rest }) => {
  return (
    <CustomCardStyled {...rest} width={width}>
      {children}
    </CustomCardStyled>
  );
};

const CustomCardStyled = styled(Card)`
  max-width: ${({ width }) => `${width ? `${width}px` : '100%'}`};
  margin: auto;

  .ant-card-body {
    padding: 16px 24px;
  }
`;

export default CustomCard;
