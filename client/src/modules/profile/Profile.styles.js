import styled from "styled-components";
import get from "lodash/get";
import { Card, Button } from "antd";

const ProfileBoxStyled = styled(Card)`
  max-width: 500px;
  margin: auto;
`;

const BoxTitleStyled = styled.p`
  text-align: center;
`;

const TopStyled = styled.div`
  display: flex;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => get(theme, "colors.lineColor")};
`;

const TextInfoStyled = styled.div`
  margin-left: 16px;
`;

const BottomStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const EditButtonStyled = styled(Button)`
  margin-right: 10px;
`;

export default {
  ProfileBoxStyled,
  BoxTitleStyled,
  TopStyled,
  TextInfoStyled,
  BottomStyled,
  EditButtonStyled,
};
