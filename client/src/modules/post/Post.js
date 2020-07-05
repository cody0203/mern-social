import React, { useState, useEffect } from "react";
import styled from "styled-components";
import get from "lodash/get";
import moment from "moment";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import {
  HeartFilled,
  MessageFilled,
  GlobalOutlined,
  LockOutlined,
  MoreOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import CustomAvatar from "../common/components/CustomAvatar";
import PrivacySelect from "./PrivacySelect";
import EditPostModal from "./EditPostModal";

import * as actions from "../../system/store/post/post.actions";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [isEditPostModalVisible, setIsEditPostModalVisible] = useState(false);
  const { userInfo } = useSelector((store) => get(store, "authReducer"));
  const { updatePostLoading } = useSelector((store) =>
    get(store, "postReducer")
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

  return (
    <PostStyled>
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

        <MoreIconStyled onClick={openEditPostModal} />
      </TopContainerStyled>
      <ContentStyled>{content}</ContentStyled>
      <ActionContainerStyled>
        <ActionIconContainer>
          <LikeIconStyled />
          <span>{get(likes, "length")}</span>
        </ActionIconContainer>
        <ActionIconContainer>
          <CommentIconStyled />
          <span>{get(comments, "length")}</span>
        </ActionIconContainer>
      </ActionContainerStyled>

      <EditPostModal
        onCancel={closeEditPostModal}
        visible={isEditPostModalVisible}
        initialValue={content}
        publicStatus={isPublic ? "public" : "private"}
        postId={postId}
        loading={updatePostLoading}
      />
    </PostStyled>
  );
};

const PostStyled = styled.div`
  background-color: ${({ theme }) => get(theme, "colors.background")};
  border-radius: 2px;
  border: 1px solid ${({ theme }) => get(theme, "colors.lineColor")};
  margin-bottom: 24px;
`;

const TopContainerStyled = styled.div`
  position: relative;
  padding: 12px 24px;
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
  font-size: 24px;
  cursor: pointer;
`;

export default Post;
