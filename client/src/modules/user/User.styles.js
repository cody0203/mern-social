import styled from 'styled-components';
import get from 'lodash/get';
import { ArrowRightOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { Link } from 'react-router-dom';

const ListItemStyled = styled(List.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemLinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  padding: 16px 24px;
  &:hover {
    background-color: ${({ theme }) => get(theme, 'colors.lineColor')};
  }
`;

const UserInfoContainer = styled(Link)`
  display: flex;
  align-items: center;

  .user-name {
    font-size: 16px;
    font-weight: 500;
    margin-left: 10px;
  }

  &:hover {
    .user-name {
      color: ${({ theme }) => get(theme, 'colors.primary')};
    }
  }
`;

const OpenDetailButtonStyled = styled(ArrowRightOutlined)`
  color: ${({ theme }) => get(theme, 'colors.primary')};
`;

export default { ListItemStyled, OpenDetailButtonStyled, ItemLinkStyled, UserInfoContainer };
