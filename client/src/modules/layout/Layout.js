import React, { useState } from "react";
import { Drawer } from "antd";

import CustomMenu from "./components/Menu";

import Styled from "./Layout.styles";

const CustomLayout = ({ children }) => {
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState(false);

  const openMenuDrawerHandler = () => {
    setIsDrawerMenuOpen(true);
  };

  const closeMenuDrawerHandler = () => {
    setIsDrawerMenuOpen(false);
  };

  return (
    <Styled.LayoutStyled>
      <CustomMenu openMenuDrawerHandler={openMenuDrawerHandler} />
      <Styled.ContentStyled>
        <div className="site-layout-content">{children}</div>
      </Styled.ContentStyled>

      <Drawer
        title="MERN Skeleton"
        placement="left"
        closable={false}
        onClose={closeMenuDrawerHandler}
        visible={isDrawerMenuOpen}
      >
        <Styled.DrawerLinkStyled to="/" onClick={closeMenuDrawerHandler}>
          Home
        </Styled.DrawerLinkStyled>
        <Styled.DrawerLinkStyled to="/users" onClick={closeMenuDrawerHandler}>
          Users
        </Styled.DrawerLinkStyled>
        <Styled.DrawerLinkStyled to="/sign-up" onClick={closeMenuDrawerHandler}>
          Sign Up
        </Styled.DrawerLinkStyled>
        <Styled.DrawerLinkStyled to="/sign-in" onClick={closeMenuDrawerHandler}>
          Sign In
        </Styled.DrawerLinkStyled>
      </Drawer>
    </Styled.LayoutStyled>
  );
};

export default CustomLayout;
