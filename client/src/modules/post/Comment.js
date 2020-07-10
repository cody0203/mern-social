import React, { useState } from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import { Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { EllipsisOutlined } from '@ant-design/icons';
import CustomAvatar from '../common/components/CustomAvatar';

const Comment = ({ comment }) => {
  const posterId = get(comment, 'poster._id');
  const posterName = get(comment, 'poster.name');
  const content = get(comment, 'content');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <p>Edit</p>
      </Menu.Item>
      <Menu.Item key='1'>
        <p>Delete</p>
      </Menu.Item>
    </Menu>
  );

  const changeDropdownVisibleHandler = (visible) => {
    setIsDropdownVisible(visible);
  };

  return (
    <CommentStyled>
      <Link to={`/user/profile/${posterId}`}>
        <CustomAvatar size={30} src={`http://localhost:8080/api/user/avatar/${posterId}?${new Date().getTime()}`} />
      </Link>
      <ContentStyled>
        <PosterNameStyled to={`/user/profile/${posterId}`}>{posterName}</PosterNameStyled> {content}
      </ContentStyled>
      <Dropdown
        visible={isDropdownVisible}
        overlay={menu}
        trigger={['click']}
        onVisibleChange={changeDropdownVisibleHandler}
      >
        <MoreIconStyled $isVisible={isDropdownVisible} />
      </Dropdown>
    </CommentStyled>
  );
};

const CommentStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 16px 36px 0 16px;
`;

const PosterNameStyled = styled(Link)`
  color: ${({ theme }) => get(theme, 'colors.primary')};
  font-weight: 500;
`;

const ContentStyled = styled.p`
  padding: 8px 16px;
  background-color: ${({ theme }) => get(theme, 'colors.background')};
  margin-left: 16px;
  border-radius: 50px;
`;

const MoreIconStyled = styled(EllipsisOutlined)`
  position: absolute;
  right: 10px;
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  font-size: 18px;
  cursor: pointer;

  ${CommentStyled}:hover & {
    display: block;
  }
`;

export default Comment;
