import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { get, includes } from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
import { Tooltip, Input, Dropdown, Menu } from "antd";
import {
  HeartFilled,
  HeartOutlined,
  MessageFilled,
  GlobalOutlined,
  LockOutlined,
  MoreOutlined,
  EllipsisOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import CustomAvatar from "../common/components/CustomAvatar";
import PrivacySelect from "./PrivacySelect";
import EditPostModal from "./EditPostModal";
import CommentContainer from "../comment/CommentContainer";
import CommentField from "../comment/CommentField";
import CustomDeleteConfirmModal from "../common/components/CustomDeleteConfirmModal";

import * as actions from "../../system/store/post/post.actions";
import * as commentActions from "../../system/store/comment/comment.actions";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const commentInputRef = useRef({});
  const [isEditPostModalVisible, setIsEditPostModalVisible] = useState(false);
  const [isDeletePostModalVisible, setIsDeletePostModalVisible] = useState(
    false
  );
  const [commentValue, setCommentValue] = useState("");
  const [postCommenting, setPostCommenting] = useState(null);
  const { userInfo } = useSelector((store) => get(store, "authReducer"));
  const { updatePostLoading } = useSelector((store) =>
    get(store, "postReducer")
  );
  const { createCommentLoading } = useSelector((store) =>
    get(store, "commentReducer")
  );
  const { deletePostLoading } = useSelector((store) =>
    get(store, "postReducer.deletePost")
  );

  const id = get(userInfo, "_id");
  const name = get(userInfo, "name");

  const postId = get(post, "_id");
  const content = get(post, "content");
  const created = get(post, "created");
  const likes = get(post, "likes");
  const isPublic = get(post, "public");
  const comments = get(post, "comments");
  const owner = get(post, "owner");
  const ownerName = get(owner, "name");
  const ownerId = get(owner, "_id");

  let postStatus = (
    <Tooltip title="Public">
      <GlobalOutlined />
    </Tooltip>
  );

  if (!isPublic) {
    postStatus = (
      <Tooltip title="Only me">
        <LockOutlined />
      </Tooltip>
    );
  }

  useEffect(() => {
    if (!createCommentLoading) {
      setCommentValue("");
    }
  }, [createCommentLoading]);

  useEffect(() => {
    if (!updatePostLoading) {
      closeEditPostModal();
    }
  }, [updatePostLoading]);

  const changePrivacyPostHandler = (value) => {
    let isPublic;
    if (value === "public") {
      isPublic = true;
    }

    if (value === "private") {
      isPublic = false;
    }

    dispatch(
      actions.updatePostStart({ id: postId, params: { public: isPublic } })
    );
  };

  const openEditPostModal = () => {
    setIsEditPostModalVisible(true);
  };

  const closeEditPostModal = () => {
    setIsEditPostModalVisible(false);
  };

  const openDeleteModal = () => {
    setIsDeletePostModalVisible(true);
  };

  const closeDeleteModal = () => {
    setIsDeletePostModalVisible(false);
  };
  const likePostHandler = () => {
    dispatch(actions.likePostStart(postId));
  };

  let likeIcon = <LikeIconStyled onClick={likePostHandler} />;

  if (includes(likes, id)) {
    likeIcon = <LikedIconStyled onClick={likePostHandler} />;
  }

  const commentHandler = (e) => {
    setPostCommenting(postId);
    commentInputRef.current.blur();
    dispatch(
      commentActions.createCommentStart({
        id: postId,
        params: { content: commentValue, owner: id },
      })
    );
  };

  const onChangeCommentHandler = (e) => {
    const value = get(e, "target.value");
    setCommentValue(value);
  };

  const focusCommentInputHandler = () => {
    commentInputRef.current.focus();
  };

  const deletePostHandler = () => {
    dispatch(actions.deletePostStart(postId));
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <p onClick={openEditPostModal}>Edit</p>
      </Menu.Item>
      <Menu.Item key="1">
        <p onClick={openDeleteModal}>Delete</p>
      </Menu.Item>
    </Menu>
  );

  return (
    <PostStyled>
      <PostContentStyled>
        <TopContainerStyled>
          <Link to={`/user/profile/${ownerId}`}>
            <CustomAvatar
              size={50}
              src={`http://localhost:8080/api/user/avatar/${ownerId}?${new Date().getTime()}`}
            />
          </Link>
          <TopContentStyled>
            <OwnerNameStyled to={`/user/profile/${ownerId}`}>
              {ownerName}
            </OwnerNameStyled>
            <MetaContainerStyled>
              <TimeStyled>{moment(created).fromNow()}</TimeStyled>
              {id === ownerId ? (
                <PrivacySelect
                  shorten={true}
                  isPublic={isPublic ? "public" : "private"}
                  changePrivacyPostHandler={changePrivacyPostHandler}
                />
              ) : (
                <>{postStatus}</>
              )}
            </MetaContainerStyled>
          </TopContentStyled>
          {id === ownerId && (
            <Dropdown overlay={menu} trigger={["click"]}>
              <MoreIconStyled />
            </Dropdown>
          )}
        </TopContainerStyled>
        <ContentStyled>{content}</ContentStyled>
        <ActionContainerStyled>
          <ActionIconContainer>
            {likeIcon}
            <span>{get(likes, "length")}</span>
          </ActionIconContainer>
          <ActionIconContainer onClick={focusCommentInputHandler}>
            <CommentIconStyled />
            <span>{get(comments, "length")}</span>
          </ActionIconContainer>
        </ActionContainerStyled>
      </PostContentStyled>

      <CommentContainer comments={comments} />
      <CommentContainerStyle>
        <CommentField
          ref={commentInputRef}
          value={commentValue}
          ownerId={ownerId}
          onPressEnter={commentHandler}
          onChange={onChangeCommentHandler}
          currentId={postCommenting}
          targetId={postId}
          loading={createCommentLoading}
        />
      </CommentContainerStyle>

      <EditPostModal
        onCancel={closeEditPostModal}
        visible={isEditPostModalVisible}
        initialValue={content}
        publicStatus={isPublic ? "public" : "private"}
        postId={postId}
        loading={updatePostLoading}
      />

      <CustomDeleteConfirmModal
        visible={isDeletePostModalVisible}
        onCancel={closeDeleteModal}
        title="Delete post"
        desc="Confirm to delete this post?"
        onOk={deletePostHandler}
        loading={deletePostLoading}
      />
    </PostStyled>
  );
};

const PostStyled = styled.div`
  border-radius: 2px;
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => get(theme, "colors.lineColor")};
`;

const PostContentStyled = styled.div`
  background-color: ${({ theme }) => get(theme, "colors.background")};
`;

const TopContainerStyled = styled.div`
  position: relative;
  padding: 12px 16px;
  display: flex;
  align-items: center;
`;

const TopContentStyled = styled.div`
  margin-left: 12px;
`;

const OwnerNameStyled = styled(Link)`
  color: ${({ theme }) => get(theme, "colors.primary")};
`;

const MetaContainerStyled = styled.div`
  display: flex;
  align-items: center;
`;

const TimeStyled = styled.span`
  position: relative;
  padding-right: 10px;
  margin-right: 5px;

  &::after {
    position: absolute;
    top: calc(50% - 2px);
    right: 0;
    content: "";
    width: 4px;
    height: 4px;
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 50%;
  }
`;

const ContentStyled = styled.div`
  background-color: white;
  padding: 16px;
  color: black;
`;

const ActionContainerStyled = styled.div`
  padding: 12px 16px;
  display: flex;
`;

const ActionIconContainer = styled.div`
  margin-right: 16px;
  cursor: pointer;
`;

const LikedIconStyled = styled(HeartFilled)`
  font-size: 20px;
  color: ${({ theme }) => get(theme, "colors.primary")};
  margin-right: 6px;
`;

const LikeIconStyled = styled(HeartOutlined)`
  font-size: 20px;
  color: ${({ theme }) => get(theme, "colors.primary")};
  margin-right: 6px;
`;

const CommentIconStyled = styled(MessageFilled)`
  font-size: 20px;
  color: ${({ theme }) => get(theme, "colors.primary")};
  margin-right: 6px;
`;

const MoreIconStyled = styled(EllipsisOutlined)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const CommentContainerStyle = styled.div`
  width: 100%;
`;
export default Post;
