import styled from "styled-components";
import get from "lodash/get";
import { ArrowRightOutlined } from "@ant-design/icons";
import { List } from "antd";
import { Link } from "react-router-dom";

const ListItemStyled = styled(List.Item)`
  padding: 0 !important;
`;

const ItemLinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  padding: 16px 24px;
  &:hover {
    background-color: ${({ theme }) => get(theme, "colors.lineColor")};
  }
`;

const OpenDetailButtonStyled = styled(ArrowRightOutlined)`
  color: ${({ theme }) => get(theme, "colors.primary")};
`;

export default { ListItemStyled, OpenDetailButtonStyled, ItemLinkStyled };
