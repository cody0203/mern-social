import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import get from 'lodash/get';
import CustomMenu from './components/Menu';
import { useSelector } from 'react-redux';

import Styled from './Layout.styles';
import auth from '../../system/auth/auth-helper';

const CustomLayout = ({ children }) => {
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState(false);
  const history = useHistory();
  const isAuthenticated = auth.isAuthenticated();
  const { userInfo } = useSelector((store) => get(store, 'authReducer'));
  const userId = get(userInfo, '_id');

  const openMenuDrawerHandler = () => {
    setIsDrawerMenuOpen(true);
  };

  const closeMenuDrawerHandler = () => {
    setIsDrawerMenuOpen(false);
  };

  const signOutHandler = () => {
    setIsDrawerMenuOpen(false);
    auth.clearToken(() => history.push('/'));
  };

  return (
    <Styled.LayoutStyled>
      <CustomMenu
        openMenuDrawerHandler={openMenuDrawerHandler}
        isAuthenticated={isAuthenticated}
        userId={userId}
        signOutHandler={signOutHandler}
      />
      <Styled.ContentStyled>
        <div className='site-layout-content'>{children}</div>
      </Styled.ContentStyled>

      <Drawer
        title='MERN Skeleton'
        placement='left'
        closable={false}
        onClose={closeMenuDrawerHandler}
        visible={isDrawerMenuOpen}
      >
        <Styled.DrawerLinkStyled to='/' onClick={closeMenuDrawerHandler}>
          Home
        </Styled.DrawerLinkStyled>
        <Styled.DrawerLinkStyled to='/users' onClick={closeMenuDrawerHandler}>
          Users
        </Styled.DrawerLinkStyled>

        {!isAuthenticated && [
          <Styled.DrawerLinkStyled to='/sign-up' onClick={closeMenuDrawerHandler}>
            Sign Up
          </Styled.DrawerLinkStyled>,
          <Styled.DrawerLinkStyled to='/sign-in' onClick={closeMenuDrawerHandler}>
            Sign In
          </Styled.DrawerLinkStyled>,
        ]}

        {isAuthenticated && [
          <Styled.DrawerLinkStyled to={`/user/profile/${userId}`} onClick={closeMenuDrawerHandler}>
            My Profile
          </Styled.DrawerLinkStyled>,
          <Button type='primary' onClick={signOutHandler}>
            Sign Out
          </Button>,
        ]}
      </Drawer>
    </Styled.LayoutStyled>
  );
};

export default CustomLayout;
