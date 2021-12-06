import React, { forwardRef } from "react";
import styled from "styled-components";
import get from "lodash/get";
import { Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useGetUserInfo } from "../../system/api/user";
import CustomAvatar from "../common/components/CustomAvatar";

const CommentField = forwardRef((props, ref) => {
  const { value, onPressEnter, onChange, currentId, targetId, loading } = props;

  const isCommenting = currentId === targetId;
  const { data } = useGetUserInfo();
  const id = get(data, "_id");

  return (
    <>
      <CommentInputContainer>
        <CustomAvatar size={30} id={id} />

        <CommentInput
          ref={ref}
          placeholder="Write a comment..."
          value={value}
          onPressEnter={onPressEnter}
          onChange={onChange}
          disabled={isCommenting && loading}
          suffix={isCommenting && loading && <LoadingOutlined />}
        />
      </CommentInputContainer>
    </>
  );
});

const CommentInputContainer = styled.div`
  display: flex;
  margin: 0 16px 16px 16px;
`;

const CommentInput = styled(Input)`
  margin-left: 16px;
  border-radius: 50px;
`;

export default CommentField;
