import React, { useState, useEffect } from "react";
import { Drawer, Button } from "antd";
import { useHistory } from "react-router-dom";
import get from "lodash/get";
import CustomMenu from "./components/Menu";
import { useSelector, useDispatch } from "react-redux";

import Styled from "./Layout.styles";
import auth from "../../system/auth/auth-helper";

import * as authActions from "../../system/store/auth/auth.actions";

const CustomLayout = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState(false);
  const { userInfo } = useSelector((store) => get(store, "authReducer"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userId = get(userInfo, "_id");

  const openMenuDrawerHandler = () => {
    setIsDrawerMenuOpen(true);
  };

  useEffect(() => {
    console.log(auth.isAuthenticated(), userInfo);
    if (auth.isAuthenticated()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [auth.isAuthenticated(), userInfo]);

  const closeMenuDrawerHandler = () => {
    setIsDrawerMenuOpen(false);
  };

  const signOutHandler = () => {
    setIsDrawerMenuOpen(false);
    auth.clearToken(() => history.push("/"));
    dispatch(authActions.clearAuthState());
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
          >
            Sign Up
          </Styled.DrawerLinkStyled>,
          <Styled.DrawerLinkStyled
            to="/sign-in"
            onClick={closeMenuDrawerHandler}
          >
            Sign In
          </Styled.DrawerLinkStyled>,
        ]}

        {isAuthenticated && [
          <Styled.DrawerLinkStyled
            to={`/user/profile/${userId}`}
            onClick={closeMenuDrawerHandler}
          >
            My Profile
          </Styled.DrawerLinkStyled>,
          <Button type="primary" onClick={signOutHandler}>
            Sign Out
          </Button>,
        ]}
      </Drawer>
    </Styled.LayoutStyled>
  );
};

export default CustomLayout;
