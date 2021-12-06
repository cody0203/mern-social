import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { get, isEmpty } from "lodash";
import { Input, Button, Popover } from "antd";
import { SmileFilled } from "@ant-design/icons";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import CustomAvatar from "../common/components/CustomAvatar";
import PrivacySelect from "./PrivacySelect";
import { useGetUserInfo } from "../../system/api/user";

const { TextArea } = Input;

const PostForm = ({
  action,
  submitButtonTitle,
  loading,
  initialValue = "",
  publicStatus = "public",
  postId,
}) => {
  const [value, setValue] = useState("");
  const [isPublicPost, setIsPublicPost] = useState(publicStatus);
  const { data } = useGetUserInfo();
  const id = get(data, "_id");
  const name = get(data, "name");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setIsPublicPost(publicStatus);
  }, [publicStatus]);

  const onChangeCommentHandler = (e) => {
    const value = get(e, "target.value");

    setValue(value);
  };

  const changePrivacyPostHandler = (value) => {
    setIsPublicPost(value);
  };

  const selectEmojiHandler = (emoji) => {
    const newValue = `${value}${get(emoji, "native")}`;
    setValue(newValue);
  };

  const createPostHandler = () => {
    if (isEmpty(value)) return;
    const isPublic = isPublicPost === "public" ? true : false;
    action({
      id: postId,
      ownerId: id,
      ownerName: name,
      params: { content: value, public: isPublic },
    });
  };

  return (
    <>
      <StatusFormStyled>
        <UserInfoContainer>
          <CustomAvatar size={50} id={id} />
          <span className="user-name">{name}</span>
        </UserInfoContainer>{" "}
      </StatusFormStyled>

      <TextAreaContainerStyled>
        <TextAreaStyled
          placeholder="What's on your mind?"
          value={value}
          onChange={onChangeCommentHandler}
          autoSize={{ minRows: 3 }}
        />

        <ExtraContentContainerStyled>
          <Popover
            content={
              <Picker
                set="apple"
                showPreview={false}
                showSkinTones={false}
                onSelect={selectEmojiHandler}
              />
            }
            trigger="click"
          >
            <EmojiPickerIcon />
          </Popover>
        </ExtraContentContainerStyled>
      </TextAreaContainerStyled>
      <ActionContainerStyled>
        <PrivacySelect
          changePrivacyPostHandler={changePrivacyPostHandler}
          isPublic={isPublicPost}
          shorten={false}
          disabled={loading}
        />
        <PostButtonStyled
          type="primary"
          disabled={isEmpty(value)}
          onClick={createPostHandler}
          loading={loading}
        >
          {submitButtonTitle}
        </PostButtonStyled>
      </ActionContainerStyled>
    </>
  );
};

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;

  .user-name {
    font-size: 16px;
    font-weight: 500;
    margin-left: 16px;
  }
`;

const StatusFormStyled = styled.div`
  padding: 16px;
  border-radius: 2px;
`;

const TextAreaContainerStyled = styled.div`
  background-color: white;
  padding-bottom: 16px;
`;

const TextAreaStyled = styled(TextArea)`
  border: none;
  resize: none;
  border-radius: 0px;
  color: black;
  padding-left: 16px;

  &.ant-input:focus,
  &.ant-input-focused,
  &.ant-input:hover {
    border-color: none;
    outline: none;
    box-shadow: none;
  }
`;

const ExtraContentContainerStyled = styled.div`
  // display: flex;
  // justify-content: space-between;
  text-align: right;
  margin: 0 16px;
`;

const EmojiPickerIcon = styled(SmileFilled)`
  font-size: 20px;
  color: ${({ theme }) => get(theme, "colors.primary")};
`;

const ActionContainerStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => get(theme, "colors.background")};
`;

const PostButtonStyled = styled(Button)`
  margin-left: 16px;
`;

export default PostForm;
