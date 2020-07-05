import React from "react";
import { Form } from "antd";

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
    <CustomFormModal title="Edit post" visible={visible} onCancel={onCancel}>
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
    </CustomFormModal>
  );
};

export default EditPostModal;
