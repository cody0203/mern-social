import get from "lodash/get";
import styled from "styled-components";
import { Menu, Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;

const HeaderStyled = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => get(theme, "colors.primary")};
`;

const LogoStyled = styled(Link)`
  display: block;
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin-right: 24px;
`;

const MenuStyled = styled(Menu)`
  background-color: ${({ theme }) => get(theme, "colors.primary")};
  border-bottom: none;

  .ant-menu-item {
    top: 0;
  }

  .ant-menu-item,
  .ant-menu-item-selected,
  .ant-menu-item:hover {
    border-bottom: none;
  }

  .ant-menu-item-selected a,
  .ant-menu-item:hover a,
  .ant-menu-item a {
    color: white;
  }

  .ant-menu-item-selected,
  .ant-menu-item:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const MenuItemStyled = styled(Menu.Item)`
  color: white;
`;

const MobileMenuIconStyled = styled(MenuOutlined)`
  display: block;
  padding: 8px;
  color: white;
  font-size: 20px;
  border: 1px solid white;
  border-radius: 4px;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const SignOutButtonStyled = styled.span`
  color: white;
`;

export default {
  HeaderStyled,
  MobileMenuIconStyled,
  MenuItemStyled,
  MenuStyled,
  LogoStyled,
  SignOutButtonStyled,
};
