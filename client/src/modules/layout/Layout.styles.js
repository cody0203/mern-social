import styled from "styled-components";
import { Layout } from "antd";
import { Link } from "react-router-dom";

const { Content } = Layout;

const LayoutStyled = styled(Layout)`
  background-color: white;
`;

const ContentStyled = styled(Content)`
  background-color: white;
  margin-top: 50px;
  padding: 0 16px;
`;

const DrawerLinkStyled = styled(Link)`
  display: block;
  padding-bottom: 16px;
`;

export default {
  LayoutStyled,
  ContentStyled,
  DrawerLinkStyled,
};
