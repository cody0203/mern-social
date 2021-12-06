import React, { useState, useRef } from "react";
import styled from "styled-components";
import { get, includes } from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
import { Tooltip, Dropdown, Menu } from "antd";
import {
  HeartFilled,
  HeartOutlined,
  MessageFilled,
  GlobalOutlined,
  LockOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import CustomAvatar from "../common/components/CustomAvatar";
import PrivacySelect from "./PrivacySelect";
import EditPostModal from "./EditPostModal";
import CommentContainer from "../comment/CommentContainer";
import CommentField from "../comment/CommentField";
import CustomDeleteConfirmModal from "../common/components/CustomDeleteConfirmModal";

import { useGetUserInfo } from "../../system/api/user";
import {
  useDeletePost,
  useReactionPost,
  useUpdatePost,
} from "../../system/api/post";
import { usePostComment } from "../../system/api/comment";

const Post = ({ post }) => {
  const commentInputRef = useRef({});
  const [isEditPostModalVisible, setIsEditPostModalVisible] = useState(false);
  const [isDeletePostModalVisible, setIsDeletePostModalVisible] =
    useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [postCommenting, setPostCommenting] = useState(null);
  const { data } = useGetUserInfo();

  const id = get(data, "_id");
  const name = get(data, "name");

  const postId = get(post, "_id");
  const content = get(post, "content");
  const created = get(post, "created");
  const likes = get(post, "likes");
  const isPublic = get(post, "public");
  const comments = get(post, "comments");
  const owner = get(post, "owner");
  const ownerName = get(owner, "name");
  const ownerId = get(owner, "_id");

  const { mutate: deletePost, isLoading: deletePostLoading } = useDeletePost();
  const { mutate: updatePost, isLoading: updatePostLoading } =
    useUpdatePost(post);

  const { mutate: reactionPost, isLoading: isReactionLoading } =
    useReactionPost(post, id);

  const { mutate: postComment, isLoading: createCommentLoading } =
    usePostComment(post);

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

  const changePrivacyPostHandler = (value) => {
    let isPublic;
    if (value === "public") {
      isPublic = true;
    }

    if (value === "private") {
      isPublic = false;
    }
    updatePost({ id: postId, params: { public: isPublic } });
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
    if (!isReactionLoading) {
      reactionPost(postId);
    }
  };

  let likeIcon = <LikeIconStyled onClick={likePostHandler} />;

  if (includes(likes, id)) {
    likeIcon = <LikedIconStyled onClick={likePostHandler} />;
  }

  const commentHandler = (e) => {
    setPostCommenting(postId);
    commentInputRef.current.blur();
    setCommentValue("");

    postComment({
      id: postId,
      params: { content: commentValue, owner: id, ownerName: name },
    });
  };

  const onChangeCommentHandler = (e) => {
    const value = get(e, "target.value");
    setCommentValue(value);
  };

  const focusCommentInputHandler = () => {
    commentInputRef.current.focus();
  };

  const deletePostHandler = () => {
    deletePost(postId);
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
    <PostStyled $isMock={postId === "mock"}>
      <PostContentStyled>
        <TopContainerStyled>
          <Link to={`/user/profile/${ownerId}`}>
            <CustomAvatar size={50} id={ownerId} />
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
                  isLoading={updatePostLoading}
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
          userId={id}
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
        post={post}
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
  position: relative;
  border-radius: 2px;
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => get(theme, "colors.lineColor")};

  ${({ $isMock }) =>
    $isMock
      ? `
    pointer-events: none;
    &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.3;
  }`
      : ""};
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
  margin-top: 16px;
`;
export default Post;
