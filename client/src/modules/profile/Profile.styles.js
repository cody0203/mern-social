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
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => get(theme, "colors.lineColor")};
`;

const TopContentStyled = styled.div`
  display: flex;
`;

const TextInfoStyled = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin-left: 16px;
`;

const NameStyled = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const BottomStyled = styled.div`
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
  TopContentStyled,
  NameStyled,
};
