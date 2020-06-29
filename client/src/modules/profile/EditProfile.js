import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "antd";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { useDispatch, useSelector } from "react-redux";

import CustomHeader from "../common/components/CustomHeader";
import CustomInput from "../common/components/CustomInput";
import CommonStyled from "../common/styles/Form";

import * as actions from "../../system/store/user/user.actions";
import { useHistory, useParams } from "react-router-dom";

const EditProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { userId } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { userProfileLoading, userProfileData } = useSelector((store) =>
    get(store, "userReducer.userProfile")
  );

  const { updateUserLoading, updateUserError } = useSelector((store) =>
    get(store, "userReducer.updateUser")
  );
  const name = get(userProfileData, "name");
  const email = get(userProfileData, "email");

  useEffect(() => {
    dispatch(actions.fetchUserStart(userId));
  }, []);

  const onFinish = (values) => {
    dispatch(actions.updateUserStart({ userId, params: { ...values } }));
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (!updateUserLoading && !updateUserError && isSubmitted) {
      return history.push(`/user/profile/${userId}`);
    }
  }, [updateUserLoading, updateUserError, isSubmitted]);

  const onClearForm = () => {
    form.resetFields();
  };

  return (
    <div>
      <CustomHeader>Edit Profile</CustomHeader>

      {userProfileLoading ? null : (
        <CommonStyled.FormStyled
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{
            name,
            email,
          }}
        >
          <CustomInput
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          />
          <CustomInput
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          />
          <CustomInput
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            type="password"
          />

          <Button type="primary" htmlType="submit" loading={updateUserLoading}>
            Submit
          </Button>
        </CommonStyled.FormStyled>
      )}
    </div>
  );
};

export default EditProfile;
