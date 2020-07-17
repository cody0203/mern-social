import React, { useState, useRef, useEffect } from 'react';
import { get, isEmpty, remove } from 'lodash';
import styled from 'styled-components';
import { Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { EllipsisOutlined, LikeFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';

import CommentField from './CommentField';
import CommentItem from './CommentItem';

import socket from '../../system/socket';

import * as actions from '../../system/store/comment/comment.actions';
import * as postActions from '../../system/store/post/post.actions';

const Comment = ({ comment }) => {
  const commentInputRef = useRef({});
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => get(store, 'authReducer'));
  const { createReplyLoading } = useSelector((store) => get(store, 'commentReducer'));
  const { postListData } = useSelector((store) => get(store, 'postReducer.postList'));

  const userId = get(userInfo, '_id');
  const userName = get(userInfo, 'name');
  const posterId = get(comment, 'owner._id');
  const postId = get(comment, 'postId');
  const id = get(comment, '_id');
  const posterName = get(comment, 'owner.name');
  const content = get(comment, 'content');
  const likes = get(comment, 'likes');
  const replies = get(comment, 'replies');
  const totalLike = get(likes, 'length');
  const currentPost = postListData.find((post) => get(post, '_id') === postId);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isReplyInputVisible, setIsReplyInputVisible] = useState(false);
  const [currentReplyId, setCurrentReplyId] = useState(null);
  const [currentDropdownId, setCurrentDropdownId] = useState(null);
  const [commentReplying, setCommentReplying] = useState(null);
  const [replyValue, setReplyValue] = useState('');

  useEffect(() => {
    socket.on('create-reply', ({ data }) => {
      dispatch(postActions.updatePostListData(data));
    });
  }, []);

  useEffect(() => {
    if (isReplyInputVisible && currentReplyId === id) {
      commentInputRef.current.focus();
    }
  }, [isReplyInputVisible, currentReplyId, id, commentInputRef]);

  const changeDropdownVisibleHandler = (id, visible) => {
    setCurrentDropdownId(id);
    setIsDropdownVisible(visible);
  };

  const menuClickHandler = () => {
    setIsDropdownVisible(false);
  };

  const likeCommentHandler = (id) => {
    dispatch(
      postActions.updatePostListData({
        ...currentPost,
        comments: currentPost.comments.map((existComment) => {
          const existCommentId = get(existComment, '_id');

          if (existCommentId === id) {
            const currentLikes = get(existComment, 'likes');
            return {
              ...existComment,
              likes: !currentLikes.includes(userId) ? [...currentLikes, userId] : remove(currentLikes, userId),
            };
          }

          return existComment;
        }),
      })
    );
    dispatch(actions.likeCommentStart(id));
  };

  const likeReplyHandler = (id) => {
    const newPostData = {
      ...currentPost,
      comments: currentPost.comments.map((existComment) => {
        const replies = existComment.replies.map((reply) => {
          const existReplyId = get(reply, '_id');

          if (existReplyId === id) {
            const currentLikes = get(reply, 'likes');

            return {
              ...reply,
              likes: !currentLikes.includes(userId) ? [...currentLikes, userId] : remove(currentLikes, userId),
            };
          }

          return reply;
        });

        return { ...existComment, replies };
      }),
    };
    dispatch(postActions.updatePostListData(newPostData));

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
    setReplyValue('');
    dispatch(
      postActions.updatePostListData({
        ...currentPost,
        comments: [...currentPost.comments].map((existComment) => {
          const existCommentId = get(existComment, '_id');
          if (existCommentId === id) {
            return {
              ...existComment,

              replies: [
                ...existComment.replies,
                {
                  _id: shortid.generate(),
                  isFake: true,
                  content: replyValue,
                  owner: { _id: userId, name: userName },
                },
              ],
            };
          }

          return existComment;
        }),
      })
    );

    dispatch(
      actions.createReplyStart({
        id,
        params: { content: replyValue },
      })
    );
  };

  return (
    <>
      {' '}
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
              likeCommentHandler={likeReplyHandler}
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
