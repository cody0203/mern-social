import React, { useState, useRef, useEffect } from 'react';
import { get, isEmpty } from 'lodash';
import styled from 'styled-components';
import { Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { EllipsisOutlined, LikeFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import CommentField from './CommentField';
import CommentItem from './CommentItem';

import * as actions from '../../system/store/comment/comment.actions';

const Comment = ({ comment }) => {
  const commentInputRef = useRef({});
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => get(store, 'authReducer'));
  const { createReplyLoading } = useSelector((store) => get(store, 'commentReducer'));
  const userId = get(userInfo, '_id');
  const posterId = get(comment, 'owner._id');
  const id = get(comment, '_id');
  const posterName = get(comment, 'owner.name');
  const content = get(comment, 'content');
  const likes = get(comment, 'likes');
  const replies = get(comment, 'replies');
  const totalLike = get(likes, 'length');

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isReplyInputVisible, setIsReplyInputVisible] = useState(false);
  const [currentReplyId, setCurrentReplyId] = useState(null);
  const [currentDropdownId, setCurrentDropdownId] = useState(null);
  const [commentReplying, setCommentReplying] = useState(null);
  const [replyValue, setReplyValue] = useState('');

  useEffect(() => {
    if (!createReplyLoading) {
      setReplyValue('');
    }
  }, [createReplyLoading]);

  const changeDropdownVisibleHandler = (id, visible) => {
    setCurrentDropdownId(id);
    setIsDropdownVisible(visible);
  };

  const menuClickHandler = () => {
    setIsDropdownVisible(false);
  };

  const likeCommentHandler = (id) => {
    dispatch(actions.likeCommentStart(id));
  };

  const showReplyInput = () => {
    if (isReplyInputVisible && currentReplyId === id) {
      commentInputRef.current.focus();
      return;
    }

    setIsReplyInputVisible(true);
    setCurrentReplyId(id);
  };

  const changeReplyValueHandler = (e) => {
    const value = get(e, 'target.value');
    setReplyValue(value);
  };

  const sendReplyHandler = () => {
    setCommentReplying(id);
    commentInputRef.current.blur();
    dispatch(actions.createReplyStart({ id, params: { content: replyValue } }));
  };

  return (
    <>
      {/* <CommentStyled>
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
              <CommentActionStyled onClick={showReplyInput}>Reply</CommentActionStyled>
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
      </CommentStyled> */}
      <CommentItem
        comment={comment}
        likeCommentHandler={likeCommentHandler}
        showReplyInput={showReplyInput}
        isDropdownVisible={isDropdownVisible}
        userId={userId}
        menuClickHandler={menuClickHandler}
        changeDropdownVisibleHandler={changeDropdownVisibleHandler}
        currentDropdownId={currentDropdownId}
      />
      <CommentFieldContainerStyled>
        {!isEmpty(replies) &&
          replies.map((reply) => (
            <CommentItem
              key={get(reply, '_id')}
              comment={reply}
              likeCommentHandler={likeCommentHandler}
              showReplyInput={showReplyInput}
              isDropdownVisible={isDropdownVisible}
              userId={userId}
              menuClickHandler={menuClickHandler}
              changeDropdownVisibleHandler={changeDropdownVisibleHandler}
              currentDropdownId={currentDropdownId}
              isReply={true}
            />
          ))}

        {isReplyInputVisible && currentReplyId === id && (
          <CommentField
            ref={commentInputRef}
            ownerId={userId}
            value={replyValue}
            onChange={changeReplyValueHandler}
            targetId={id}
            currentId={commentReplying}
            onPressEnter={sendReplyHandler}
            loading={createReplyLoading}
          />
        )}
      </CommentFieldContainerStyled>
    </>
  );
};

const CommentFieldContainerStyled = styled.div`
  margin-left: 50px;
`;

export default Comment;
