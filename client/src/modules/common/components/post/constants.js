import React from 'react';
import { GlobalOutlined, LockOutlined } from '@ant-design/icons';

export const privacyOptions = {
  public: {
    icon: <GlobalOutlined />,
    text: 'Public',
    value: 'public',
  },
  private: {
    icon: <LockOutlined />,
    text: 'Only me',
    value: 'private',
  },
};
