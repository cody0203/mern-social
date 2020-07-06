import React from "react";
import { get } from "lodash";
import { Form } from "antd";
import styled from "styled-components";

import CustomFormModal from "../common/components/CustomFormModal";
import PostForm from "./PostForm";

import * as actions from "../../system/store/post/post.actions";

const EditPostModal = ({
  visible,
  onCancel,
  initialValue,
  publicStatus,
  postId,
  loading,
}) => {
  return (
    <ModalStyled title="Edit post" visible={visible} onCancel={onCancel}>
      <Form>
        <PostForm
          submitButtonTitle="Save"
          initialValue={initialValue}
          loading={false}
          publicStatus={publicStatus}
          action={actions.updatePostStart}
          isClearingState={!visible && true}
          postId={postId}
          loading={loading}
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
