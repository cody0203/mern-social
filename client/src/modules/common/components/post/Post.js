import React from 'react';
import styled from 'styled-components';
import get from 'lodash/get';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { HeartFilled, MessageFilled } from '@ant-design/icons';

import CustomAvatar from '../CustomAvatar';

const Post = ({ post }) => {
  const postId = get(post, '_id');

  const content = get(post, 'content');
  const created = get(post, 'created');
  const likes = get(post, 'likes');
  const comments = get(post, 'comments');
  const owner = get(post, 'owner');
  const ownerName = get(owner, 'name');
  const ownerId = get(owner, '_id');

  return (
    <PostStyled>
      <TopContainerStyled>
        <Link to={`/user/profile/${ownerId}`}>
          <CustomAvatar size={50} src={`http://localhost:8080/api/user/avatar/${ownerId}?${new Date().getTime()}`} />
        </Link>
        <TopContentStyled>
          <OwnerNameStyled to={`/user/profile/${ownerId}`}>{ownerName}</OwnerNameStyled>
          <p>{moment(created).fromNow()}</p>
        </TopContentStyled>
      </TopContainerStyled>
      <ContentStyled>{content}</ContentStyled>
      <ActionContainerStyled>
        <ActionIconContainer>
          <LikeIconStyled />
          <span>{get(likes, 'length')}</span>
        </ActionIconContainer>
        <ActionIconContainer>
          <CommentIconStyled />
          <span>{get(comments, 'length')}</span>
        </ActionIconContainer>
      </ActionContainerStyled>
    </PostStyled>
  );
};

const PostStyled = styled.div`
  background-color: ${({ theme }) => get(theme, 'colors.background')};
  border-radius: 2px;
  border: 1px solid ${({ theme }) => get(theme, 'colors.lineColor')};
  margin-bottom: 24px;
`;

const TopContainerStyled = styled.div`
  padding: 12px 24px;
  display: flex;
  align-items: center;
`;

const TopContentStyled = styled.div`
  margin-left: 12px;
`;

const OwnerNameStyled = styled(Link)`
  color: ${({ theme }) => get(theme, 'colors.primary')};
`;

const ContentStyled = styled.div`
  background-color: white;
  padding: 24px;
`;

const ActionContainerStyled = styled.div`
  padding: 12px 24px;
  display: flex;
`;

const ActionIconContainer = styled.div`
  margin-right: 24px;
  cursor: pointer;
`;

const LikeIconStyled = styled(HeartFilled)`
  font-size: 20px;
  color: ${({ theme }) => get(theme, 'colors.primary')};
  margin-right: 6px;
`;

const CommentIconStyled = styled(MessageFilled)`
  font-size: 20px;
  color: ${({ theme }) => get(theme, 'colors.primary')};
  margin-right: 6px;
`;

export default Post;
