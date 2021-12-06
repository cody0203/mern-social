import React, { useEffect } from "react";
import get from "lodash/get";
import { Form } from "antd";
import styled from "styled-components";

import CustomFormModal from "../common/components/CustomFormModal";
import PostForm from "./PostForm";

import { useUpdatePost } from "../../system/api/post";

const EditPostModal = ({
  visible,
  onCancel,
  initialValue,
  publicStatus,
  postId,
  post,
}) => {
  const { mutate: updatePost, isLoading } = useUpdatePost(post);

  useEffect(() => {
    if (!isLoading) {
      onCancel();
    }
  }, [isLoading]);

  return (
    <ModalStyled
      title="Edit post"
      visible={visible}
      onCancel={isLoading ? null : onCancel}
    >
      <Form>
        <PostForm
          submitButtonTitle="Save"
          initialValue={initialValue}
          publicStatus={publicStatus}
          action={updatePost}
          postId={postId}
          loading={isLoading}
        />
      </Form>
    </ModalStyled>
  );
};

const ModalStyled = styled(CustomFormModal)`
  .ant-modal-body {
    background-color: ${({ theme }) => get(theme, "colors.background")};
  }
`;

export default EditPostModal;
