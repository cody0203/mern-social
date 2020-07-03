import React from 'react';
import { GlobalOutlined, LockOutlined } from '@ant-design/icons';

export const privacyOptions = [
  {
    icon: <GlobalOutlined />,
    text: 'Public',
    value: 'public',
  },
  {
    icon: <LockOutlined />,
    text: 'Only me',
    value: 'private',
  },
];
