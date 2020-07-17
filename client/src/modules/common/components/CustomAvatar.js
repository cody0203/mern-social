import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import config from '../../../config/config';

const CustomAvatar = ({ id, size }) => {
  return (
    <LazyLoadImageStyled
      src={`${config.server}/api/user/avatar/${id}?${new Date().getTime()}`}
      size={size}
      effect='opacity'
    />
  );
};

const LazyLoadImageStyled = styled(LazyLoadImage)`
  display: block;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => get(theme, 'colors.lineColor')};
`;

export default CustomAvatar;
