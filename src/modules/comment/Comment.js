import React, { useState, useRef, useEffect } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";

import CommentField from "./CommentField";
import CommentItem from "./CommentItem";

import { useGetUserInfo } from "../../system/api/user";
import { useLikeComment } from "../../system/api/comment";
import { useLikeReply } from "../../system/api/reply";
import { useGetPostList } from "../../system/api/post";
import usePostReply from "../../system/api/reply/usePostReply";

const Comment = ({ comment }) => {
  const commentInputRef = useRef({});
  const { data } = useGetUserInfo();

  const userId = get(data, "_id");
  const postId = get(comment, "postId");
  const id = get(comment, "_id");
  const replies = get(comment, "replies");

  const { data: postList } = useGetPostList({ isRefetch: false });

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isReplyInputVisible, setIsReplyInputVisible] = useState(false);
  const [currentReplyId, setCurrentReplyId] = useState(null);
  const [currentDropdownId, setCurrentDropdownId] = useState(null);
  const [commentReplying, setCommentReplying] = useState(null);
  const [replyValue, setReplyValue] = useState("");

  const { mutate: likeComment } = useLikeComment(userId);
  const { mutate: likeReply } = useLikeReply(userId);
  const { mutate: postReply, isLoading: createReplyLoading } =
    usePostReply(userId);

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

  const getCurrentPost = () => {
    const currentPost = get(postList, "pages", []).reduce(
      (prev, page) =>
        prev || get(page, "data", []).find((post) => post._id === postId),
      undefined
    );

    return currentPost;
  };

  const likeCommentHandler = (id) => {
    const currentPost = getCurrentPost();
    likeComment({ id, currentPost });
  };

  const likeReplyHandler = (id) => {
    const currentPost = getCurrentPost();
    likeReply({ id, currentPost });
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
    const value = get(e, "target.value");
    setReplyValue(value);
  };

  const sendReplyHandler = () => {
    setCommentReplying(id);
    commentInputRef.current.blur();
    setReplyValue("");
    const currentPost = getCurrentPost();

    postReply({
      id,
      currentPost,
      params: { content: replyValue },
    });
  };

  return (
    <>
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
              key={get(reply, "_id")}
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
