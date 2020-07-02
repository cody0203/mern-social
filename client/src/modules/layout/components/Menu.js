import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import get from 'lodash/get';
import { useSelector } from 'react-redux';

import auth from '../../../system/auth/auth-helper';
import Styled from './Menu.styles';

const CustomMenu = ({ openMenuDrawerHandler, isAuthenticated, userId, signOutHandler }) => {
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    setCurrentPage(get(location, 'pathname'));
  }, [location]);

  return (
    <Styled.HeaderStyled>
      <Styled.LogoStyled to='/'>MERN Skeleton</Styled.LogoStyled>
      <Styled.MenuStyled mode='horizontal' selectedKeys={[currentPage]}>
        <Styled.MenuItemStyled key='/'>
          <Link to='/'>Home</Link>
        </Styled.MenuItemStyled>

        {!isAuthenticated && [
          <Styled.MenuItemStyled key='/sign-up'>
            <Link to='/sign-up'>Sign Up</Link>
          </Styled.MenuItemStyled>,
          <Styled.MenuItemStyled key='/sign-in'>
            <Link to='/sign-in'>Sign In</Link>
          </Styled.MenuItemStyled>,
        ]}

        {isAuthenticated && [
          <Styled.MenuItemStyled key={`/user/profile/${userId}`}>
            <Link to={`/user/profile/${userId}`}>My Profile</Link>
          </Styled.MenuItemStyled>,
          <Styled.MenuItemStyled onClick={signOutHandler} key='sign-out'>
            <Styled.SignOutButtonStyled>Sign Out</Styled.SignOutButtonStyled>
          </Styled.MenuItemStyled>,
        ]}
      </Styled.MenuStyled>
      <Styled.MobileMenuIconStyled onClick={openMenuDrawerHandler} />
    </Styled.HeaderStyled>
  );
};

export default CustomMenu;
