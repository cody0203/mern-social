import React from 'react';
import get from 'lodash/get';
import styled from 'styled-components';
import { Menu, Dropdown, Tooltip } from 'antd';
import { CaretDownOutlined, GlobalOutlined, LockOutlined } from '@ant-design/icons';

const PrivacySelect = ({ isPublic = 'public', shorten = false, changePrivacyPostHandler }) => {
  const publicOption = (
    <div>
      <GlobalOutlined />
      <OptionValueStyled>Public</OptionValueStyled>
    </div>
  );
  const privateOption = (
    <div>
      <LockOutlined />
      <OptionValueStyled>Only me</OptionValueStyled>
    </div>
  );

  const menu = (
    <Menu onClick={({ key }) => changePrivacyPostHandler(key)}>
      <Menu.Item key='public'>{publicOption}</Menu.Item>
      <Menu.Item key='private'>{privateOption}</Menu.Item>
    </Menu>
  );

  let status = !shorten && publicOption;

  if (isPublic === 'public' && shorten) {
    status = <GlobalOutlined />;
  }

  if (isPublic === 'private' && !shorten) {
    status = privateOption;
  }

  if (isPublic === 'private' && shorten) {
    status = <LockOutlined />;
  }

  return (
    <Dropdown overlay={menu} trigger={['click']} placement='bottomLeft'>
      <PrivacySelectContainerStyled $shorten={shorten}>
        <Tooltip title={`${isPublic === 'public' ? 'Public' : 'Only me'}`} placement='topRight'>
          <CurrentStatusStyled>
            {status}
            <DropdownIconStyled />
          </CurrentStatusStyled>
        </Tooltip>
      </PrivacySelectContainerStyled>
    </Dropdown>
  );
};

const PrivacySelectContainerStyled = styled.div`
  padding: ${({ theme, $shorten }) => ($shorten ? '6px' : '2px 6px')};
  border: 1px solid ${({ theme, $shorten }) => (!$shorten ? get(theme, 'colors.text') : 'transparent')};
  cursor: pointer;

  &:hover {
    border: 1px solid ${({ theme, $shorten }) => $shorten && get(theme, 'colors.text')};
  }
`;

const CurrentStatusStyled = styled.div`
  display: flex;
  align-items: center;
`;

const OptionValueStyled = styled.span`
  margin-left: 10px;
`;

const DropdownIconStyled = styled(CaretDownOutlined)`
  margin-left: 10px;
`;

export default PrivacySelect;
