import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const CustomAvatar = ({ src, size }) => {
  if (!src) {
    return <Avatar icon={<UserOutlined />} size={size} />;
  }

  if (src) {
    return <Avatar src={src} size={size} />;
  }
};

export default CustomAvatar;
