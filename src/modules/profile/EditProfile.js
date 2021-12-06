import React, { useEffect, useState } from "react";
import { Button, Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import get from "lodash/get";
import { useHistory, useParams } from "react-router-dom";

import CustomInput from "../common/components/CustomInput";
import CommonStyled from "../common/styles/Form";
import CustomCard from "../common/components/CustomCard";
import CustomAvatar from "../common/components/CustomAvatar";

import Styled from "./EditProfile.styles";

import { useGetUserById } from "../../system/api/user";
import useUpdateUserInfo from "../../system/api/user/useUpdateUserInfo";

const EditProfile = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { userId } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tempUploadAvatar, setTempUploadAvatar] = useState([]);

  const { isLoading: userProfileLoading, data: userProfileData } =
    useGetUserById(userId);

  const {
    mutate,
    isLoading: updateUserLoading,
    isError: updateUserError,
  } = useUpdateUserInfo();

  const name = get(userProfileData, "name");
  const email = get(userProfileData, "email");
  const bio = get(userProfileData, "bio");

  const onFinish = (values) => {
    const avatar = get(tempUploadAvatar, "0");
    const data = { ...values, avatar };
    const formData = new FormData();

    for (let key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }

    mutate({ userId, params: formData });

    setIsSubmitted(true);
  };

  useEffect(() => {
    if (!updateUserLoading && !updateUserError && isSubmitted) {
      return history.push(`/user/profile/${userId}`);
    }
  }, [updateUserLoading, updateUserError, isSubmitted]);

  const uploadProps = {
    onRemove: (file) => {
      setTempUploadAvatar([]);
    },
    beforeUpload: (file) => {
      setTempUploadAvatar([file]);
      return false;
    },
    tempUploadAvatar,
  };

  return (
    <div>
      {userProfileLoading ? null : (
        <CustomCard width={600} title="Edit Profile">
          <Styled.AvatarContainer>
            <CustomAvatar size={70} id={userId} />

            <Upload
              {...uploadProps}
              fileList={tempUploadAvatar}
              className="upload-container"
            >
              <Button>
                <UploadOutlined /> Choose file
              </Button>
            </Upload>
          </Styled.AvatarContainer>
          <CommonStyled.FormStyled
            layout="vertical"
            form={form}
            onFinish={onFinish}
            initialValues={{
              name,
              email,
              bio,
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
              label="Bio"
              name="bio"
              type="textarea"
              rules={[
                {
                  required: true,
                  message: "Please input your Bio!",
                },
              ]}
            />
            <CustomInput label="Password" name="password" type="password" />

            <Button
              type="primary"
              htmlType="submit"
              loading={updateUserLoading}
            >
              Submit
            </Button>
          </CommonStyled.FormStyled>
        </CustomCard>
      )}
    </div>
  );
};

export default EditProfile;
