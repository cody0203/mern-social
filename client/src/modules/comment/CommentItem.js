import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Dropdown, Menu } from 'antd';
import { get, includes } from 'lodash';
import { Link } from 'react-router-dom';
import { EllipsisOutlined, LikeFilled } from '@ant-design/icons';
import CustomAvatar from '../common/components/CustomAvatar';
import moment from 'moment';

const CommentItem = ({
  comment,
  likeCommentHandler,
  showReplyInput,
  isDropdownVisible,
  userId,
  menuClickHandler,
  changeDropdownVisibleHandler,
  isReply,
  currentDropdownId,
}) => {
  const [isShortComment, setIsShortComment] = useState(true);

  const posterId = get(comment, 'owner._id');
  const id = get(comment, '_id');
  const posterName = get(comment, 'owner.name');
  const content = get(comment, 'content');
  const likes = get(comment, 'likes');
  const created = get(comment, 'created');
  const totalLike = get(likes, 'length');
  const isLiked = includes(likes, userId);

  useEffect(() => {
    if (get(content, 'length') > 30) {
      setIsShortComment(false);
    }
  }, [content]);

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

  const likeContainer = (
    <LikeContainerStyled className={`${!isShortComment && 'long-comment'}`}>
      <LikeIconStyled />
      <LikeCounterStyled>{totalLike}</LikeCounterStyled>
    </LikeContainerStyled>
  );

  return (
    <CommentStyled $isReply={isReply}>
      <Link to={`/user/profile/${posterId}`}>
        <CustomAvatar
          size={!isReply ? 30 : 25}
          src={`http://localhost:8080/api/user/avatar/${posterId}?${new Date().getTime()}`}
        />
      </Link>
      <ContentContainerStyled>
        <div>
          <ContentStyled>
            <Content>
              <PosterNameStyled to={`/user/profile/${posterId}`}>{posterName}</PosterNameStyled> {content}
            </Content>{' '}
            {totalLike > 0 && <>{likeContainer}</>}{' '}
            <Dropdown
              visible={isDropdownVisible && currentDropdownId === id}
              overlay={menu}
              trigger={['click']}
              onVisibleChange={changeDropdownVisibleHandler.bind(this, id)}
            >
              <MoreIconStyled $isVisible={isDropdownVisible} className={`${!isShortComment ? 'long-comment' : ''}`} />
            </Dropdown>
          </ContentStyled>{' '}
          <CommentActionsContainerStyled>
            <LikeActionStyled onClick={likeCommentHandler.bind(this, id)} $isLiked={isLiked}>
              Like
            </LikeActionStyled>
            {!isReply && (
              <>
                <span> · </span>

                <CommentActionStyled onClick={showReplyInput}>Reply</CommentActionStyled>
              </>
            )}
            <span> · </span>
            <span>{moment(created).fromNow()}</span>
          </CommentActionsContainerStyled>
        </div>{' '}
        {/* {totalLike > 0 && isShortComment && <>{likeContainer}</>} */}
      </ContentContainerStyled>
    </CommentStyled>
  );
};

const CommentStyled = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  width: fit-content;
  padding: 0 36px 16px 16px;

  &:first-child {
    padding-top: ${({ $isReply }) => (!$isReply ? '16px' : 0)};
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
  margin-left: 8px;
`;

const PosterNameStyled = styled(Link)`
  color: ${({ theme }) => get(theme, 'colors.primary')};
  font-weight: 500;
`;

const ContentStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Content = styled.p`
  background-color: ${({ theme }) => get(theme, 'colors.background')};
  padding: 6px 12px;
  border-radius: 18px;
`;

const MoreIconStyled = styled(EllipsisOutlined)`
  &.long-comment {
    position: absolute;
    right: -27px;
    top: 50%;
    transform: translateY(-50%);
  }
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  font-size: 18px;
  cursor: pointer;
  margin-left: 8px;
  ${CommentStyled}:hover & {
    display: block;
  }
`;

const CommentActionsContainerStyled = styled.div`
  margin-left: 12px;
  font-size: 12px;
`;

const LikeContainerStyled = styled.div`
  &.long-comment {
    position: absolute;
    bottom: -16px;
    right: 0px;
  }

  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  margin-left: -5px;
  padding: 2px 1px 2px 2px;
  border-radius: 10px;
  font-size: 12px;
  z-index: 2;
`;

const LikeIconStyled = styled(LikeFilled)`
  background-color: ${({ theme }) => get(theme, 'colors.primary')};
  color: white;
  border-radius: 50%;
  padding: 2px;
`;

const LikeCounterStyled = styled.span`
  margin-left: 3px;
`;

export default CommentItem;
