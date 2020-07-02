import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import LazyLoad from 'react-lazyload';

const CustomAvatar = ({ src, size }) => {
  return (
    <LazyLoad height={size}>
      <Avatar icon={<UserOutlined />} src={src} size={size} />
    </LazyLoad>
  );
};

export default CustomAvatar;
