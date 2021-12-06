import React, { useState, useEffect } from "react";
import { Drawer, Button } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import get from "lodash/get";
import CustomMenu from "./components/Menu";
import { useGetUserInfo } from "../../system/api/user";

import Styled from "./Layout.styles";
import auth from "../../system/auth/auth-helper";

const CustomLayout = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState(false);
  const { data } = useGetUserInfo();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userId = get(data, "_id");

  const openMenuDrawerHandler = () => {
    setIsDrawerMenuOpen(true);
  };

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());
  }, [location]);

  const closeMenuDrawerHandler = () => {
    setIsDrawerMenuOpen(false);
  };

  const signOutHandler = () => {
    setIsDrawerMenuOpen(false);
    auth.clearToken(() => history.push("/"));
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
        <div className="site-layout-content">{children}</div>
      </Styled.ContentStyled>

      <Drawer
        title="Quackbook"
        placement="left"
        closable={false}
        onClose={closeMenuDrawerHandler}
        visible={isDrawerMenuOpen}
      >
        <Styled.DrawerLinkStyled to="/" onClick={closeMenuDrawerHandler}>
          Home
        </Styled.DrawerLinkStyled>

        {!isAuthenticated && [
          <Styled.DrawerLinkStyled
            to="/sign-up"
            onClick={closeMenuDrawerHandler}
            key="sign-up"
          >
            Sign Up
          </Styled.DrawerLinkStyled>,
          <Styled.DrawerLinkStyled
            to="/sign-in"
            onClick={closeMenuDrawerHandler}
            key="sign-in"
          >
            Sign In
          </Styled.DrawerLinkStyled>,
        ]}

        {isAuthenticated && [
          <Styled.DrawerLinkStyled
            to={`/user/profile/${userId}`}
            onClick={closeMenuDrawerHandler}
            key="profile"
          >
            My Profile
          </Styled.DrawerLinkStyled>,
          <Button type="primary" onClick={signOutHandler} key="sign-out">
            Sign Out
          </Button>,
        ]}
      </Drawer>
    </Styled.LayoutStyled>
  );
};

export default CustomLayout;
