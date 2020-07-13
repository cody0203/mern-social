import React from 'react';
import styled from 'styled-components';
import { Dropdown, Menu } from 'antd';
import { get, includes } from 'lodash';
import { Link } from 'react-router-dom';
import { EllipsisOutlined, LikeFilled } from '@ant-design/icons';
import CustomAvatar from '../common/components/CustomAvatar';

const CommentItem = ({
  comment,
  likeCommentHandler,
  showReplyInput,
  likeContainer,
  isDropdownVisible,
  isShortComment,
  userId,
  menuClickHandler,
  changeDropdownVisibleHandler,
  isReply,
}) => {
  const posterId = get(comment, 'owner._id');
  const id = get(comment, '_id');
  const posterName = get(comment, 'owner.name');
  const content = get(comment, 'content');
  const likes = get(comment, 'likes');
  const totalLike = get(likes, 'length');
  const isLiked = includes(likes, userId);

  const menu = (
    <Menu onClick={menuClickHandler}>
      <Menu.Item key='0'>
        <p>Edit</p>
      </Menu.Item>
      <Menu.Item key='1'>
        <p>Delete</p>
      </Menu.Item>
    </Menu>
  );

  return (
    <CommentStyled>
      <Link to={`/user/profile/${posterId}`}>
        <CustomAvatar size={30} src={`http://localhost:8080/api/user/avatar/${posterId}?${new Date().getTime()}`} />
      </Link>
      <ContentContainerStyled>
        <div>
          <ContentStyled>
            <PosterNameStyled to={`/user/profile/${posterId}`}>{posterName}</PosterNameStyled> {content}{' '}
            {totalLike > 0 && !isShortComment && <>{likeContainer}</>}
          </ContentStyled>{' '}
          <CommentActionsContainerStyled>
            <LikeActionStyled onClick={likeCommentHandler} $isLiked={isLiked}>
              Like
            </LikeActionStyled>
            <span> · </span>
            {!isReply && <CommentActionStyled onClick={showReplyInput}>Reply</CommentActionStyled>}
          </CommentActionsContainerStyled>
        </div>{' '}
        {totalLike > 0 && isShortComment && <>{likeContainer}</>}
        <Dropdown
          visible={isDropdownVisible}
          overlay={menu}
          trigger={['click']}
          onVisibleChange={changeDropdownVisibleHandler}
        >
          <MoreIconStyled $isVisible={isDropdownVisible} className={`${!isShortComment ? 'long-comment' : ''}`} />
        </Dropdown>
      </ContentContainerStyled>
    </CommentStyled>
  );
};

const CommentStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 36px 16px 16px;

  &:first-child {
    padding-top: 16px;
  }
`;

const CommentActionStyled = styled.span`
  color: ${({ theme }) => get(theme, 'colors.primaryDark')};
  cursor: pointer;
`;

const LikeActionStyled = styled(CommentActionStyled)`
  font-weight: ${({ $isLiked }) => ($isLiked ? '800' : '400')};
  color: ${({ $isLiked, theme }) => $isLiked && get(theme, 'colors.primary')};
`;

const ContentContainerStyled = styled.div`
  display: flex;
  align-items: baseline;
  margin-left: 16px;
`;

const PosterNameStyled = styled(Link)`
  color: ${({ theme }) => get(theme, 'colors.primary')};
  font-weight: 500;
`;

const ContentStyled = styled.div`
  position: relative;
  padding: 6px 12px;
  background-color: ${({ theme }) => get(theme, 'colors.background')};
  border-radius: 50px;
`;

const MoreIconStyled = styled(EllipsisOutlined)`
  &.long-comment {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  font-size: 18px;
  cursor: pointer;
  margin-left: 6px;
  ${CommentStyled}:hover & {
    display: block;
  }
`;

const CommentActionsContainerStyled = styled.div`
  margin-left: 12px;
  font-size: 12px;
`;

export default CommentItem;
