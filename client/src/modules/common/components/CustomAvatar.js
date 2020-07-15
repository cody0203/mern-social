import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CustomAvatar = ({ src, size }) => {
  return <LazyLoadImageStyled src={src} size={size} />;
};

const LazyLoadImageStyled = styled(LazyLoadImage)`
  display: block;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 50%;
`;

export default CustomAvatar;
