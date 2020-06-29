import styled from "styled-components";
import get from "lodash/get";
import { ArrowRightOutlined } from "@ant-design/icons";
import { List } from "antd";

const ListItemStyled = styled(List.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => get(theme, "colors.lineColor")};
  }
`;

const OpenDetailButtonStyled = styled(ArrowRightOutlined)`
  color: ${({ theme }) => get(theme, "colors.primary")};
`;

export default { ListItemStyled, OpenDetailButtonStyled };
