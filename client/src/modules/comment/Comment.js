import React, { useState, useRef, useEffect } from "react";
import { get, includes } from "lodash";
import styled from "styled-components";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import { EllipsisOutlined, LikeFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import CustomAvatar from "../common/components/CustomAvatar";

import * as actions from "../../system/store/comment/comment.actions";

const Comment = ({ comment }) => {
  const commentRef = useRef({});
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => get(store, "authReducer"));
  const userId = get(userInfo, "_id");
  const posterId = get(comment, "owner._id");
  const id = get(comment, "_id");
  const posterName = get(comment, "owner.name");
  const content = get(comment, "content");
  const likes = get(comment, "likes");
  const totalLike = get(likes, "length");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isShortComment, setIsShortComment] = useState(true);

  const isLiked = includes(likes, userId);

  useEffect(() => {
    const currentWidth = get(commentRef, "current.offsetWidth");
    if (currentWidth > 250) {
      setIsShortComment(false);
    }
  }, [commentRef]);

  const changeDropdownVisibleHandler = (visible) => {
    setIsDropdownVisible(visible);
  };

  const menuClickHandler = () => {
    setIsDropdownVisible(false);
  };

  const menu = (
    <Menu onClick={menuClickHandler}>
      <Menu.Item key="0">
        <p>Edit</p>
      </Menu.Item>
      <Menu.Item key="1">
        <p>Delete</p>
      </Menu.Item>
    </Menu>
  );

  const likeCommentHandler = () => {
    dispatch(actions.likeCommentStart(id));
  };

  const likeContainer = (
    <LikeContainerStyled className={`${!isShortComment && "long-comment"}`}>
      <LikeIconStyled />
      <LikeCounterStyled>{totalLike}</LikeCounterStyled>
    </LikeContainerStyled>
  );

  return (
    <CommentStyled>
      <Link to={`/user/profile/${posterId}`}>
        <CustomAvatar
          size={30}
          src={`http://localhost:8080/api/user/avatar/${posterId}?${new Date().getTime()}`}
        />
      </Link>
      <ContentContainerStyled>
        <div ref={commentRef}>
          <ContentStyled>
            <PosterNameStyled to={`/user/profile/${posterId}`}>
              {posterName}
            </PosterNameStyled>{" "}
            {content} {totalLike > 0 && !isShortComment && <>{likeContainer}</>}
          </ContentStyled>{" "}
          <CommentActionsContainerStyled>
            <LikeActionStyled onClick={likeCommentHandler} $isLiked={isLiked}>
              Like
            </LikeActionStyled>
            <span> · </span>
            <CommentActionStyled>Reply</CommentActionStyled>
          </CommentActionsContainerStyled>
        </div>{" "}
        {totalLike > 0 && isShortComment && <>{likeContainer}</>}
        <Dropdown
          visible={isDropdownVisible}
          overlay={menu}
          trigger={["click"]}
          onVisibleChange={changeDropdownVisibleHandler}
        >
          <MoreIconStyled
            $isVisible={isDropdownVisible}
            className={`${!isShortComment ? "long-comment" : ""}`}
          />
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
  padding: 16px 36px 0 16px;
`;

const ContentContainerStyled = styled.div`
  display: flex;
  align-items: baseline;
  margin-left: 16px;
`;

const PosterNameStyled = styled(Link)`
  color: ${({ theme }) => get(theme, "colors.primary")};
  font-weight: 500;
`;

const ContentStyled = styled.div`
  position: relative;
  padding: 6px 12px;
  background-color: ${({ theme }) => get(theme, "colors.background")};
  border-radius: 50px;
`;

const MoreIconStyled = styled(EllipsisOutlined)`
  &.long-comment {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
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

const CommentActionStyled = styled.span`
  color: ${({ theme }) => get(theme, "colors.primary")};
  cursor: pointer;
`;

const LikeActionStyled = styled(CommentActionStyled)`
  font-weight: ${({ $isLiked }) => ($isLiked ? "bold" : "normal")};
`;

const LikeContainerStyled = styled.div`
  &.long-comment {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }

  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  margin-left: -10px;
  padding: 2px 1px 2px 2px;
  border-radius: 10px;
  font-size: 12px;
  z-index: 2;
`;

const LikeIconStyled = styled(LikeFilled)`
  background-color: ${({ theme }) => get(theme, "colors.primary")};
  color: white;
  border-radius: 50%;
  padding: 2px;
`;

const LikeCounterStyled = styled.span`
  margin-left: 3px;
`;

export default Comment;
