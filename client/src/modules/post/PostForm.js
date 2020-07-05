import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { get, isEmpty } from "lodash";
import { Input, Button, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";

import CustomAvatar from "../common/components/CustomAvatar";
import PrivacySelect from "./PrivacySelect";

const { TextArea } = Input;
const { Option } = Select;

const PostForm = ({
  action,
  submitButtonTitle,
  loading,
  initialValue = "",
  isClearingState = false,
  publicStatus = "public",
  postId,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPublicPost, setIsPublicPost] = useState(publicStatus);
  const { userInfo } = useSelector((store) => get(store, "authReducer"));
  const id = get(userInfo, "_id");
  const name = get(userInfo, "name");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setIsPublicPost(publicStatus);
  }, [publicStatus]);

  useEffect(() => {
    if ((!loading && isSubmit) || isClearingState) {
      setValue(initialValue);
      setIsPublicPost(publicStatus);
    }
  }, [loading, isSubmit, isClearingState]);

  const onChangeCommentHandler = (e) => {
    const value = get(e, "target.value");

    setValue(value);
  };

  const changePrivacyPostHandler = (value) => {
    setIsPublicPost(value);
  };

  const createPostHandler = () => {
    if (isEmpty(value)) return;
    const isPublic = isPublicPost === "public" ? true : false;
    dispatch(
      action({ id: postId, params: { content: value, public: isPublic } })
    );
    setIsSubmit(true);
  };

  return (
    <StatusFormStyled>
      <UserInfoContainer>
        <CustomAvatar
          size={50}
          src={`http://localhost:8080/api/user/avatar/${id}?${new Date().getTime()}`}
        />
        <span className="user-name">{name}</span>
      </UserInfoContainer>
      <TextArea
        placeholder="What's on your mind?"
        rows={5}
        value={value}
        onChange={onChangeCommentHandler}
      />
      <ActionContainerStyled>
        <PrivacySelect
          changePrivacyPostHandler={changePrivacyPostHandler}
          isPublic={isPublicPost}
          shorten={false}
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
    </StatusFormStyled>
  );
};

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  .user-name {
    font-size: 16px;
    font-weight: 500;
    margin-left: 16px;
  }
`;

const StatusFormStyled = styled.div`
  padding: 24px;
  border-radius: 2px;
`;

const ActionContainerStyled = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const PostButtonStyled = styled(Button)`
  margin-left: 16px;
`;

export default PostForm;
