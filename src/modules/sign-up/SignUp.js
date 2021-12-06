import React, { useEffect } from "react";
import { Button, Form, Modal } from "antd";

import CustomHeader from "../common/components/CustomHeader";
import CustomInput from "../common/components/CustomInput";
import CommonStyled from "../common/styles/Form";

import { useHistory } from "react-router";
import { useSignup } from "../../system/api/auth";

const SignUp = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { mutate, isSuccess, isLoading, error, isError } = useSignup();

  useEffect(() => {
    if (!isLoading) {
      onClearForm();
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      signUpSuccessHandler();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      signUpErrorHandler();
    }
  }, [isError]);

  useEffect(() => {}, []);

  const onFinish = (values) => {
    mutate(values);
  };

  const onClearForm = () => {
    form.resetFields();
  };

  const signUpSuccessHandler = () => {
    Modal.success({
      title: "Sign up success!",
      content: "New account successfully created.",
      okText: "Sign in",
      onOk: () => history.push("/sign-in"),
    });
  };

  const signUpErrorHandler = () => {
    Modal.error({
      title: "Sign up error",
      content: error,
      okText: "Try again",
    });
  };

  return (
    <div>
      <CustomHeader>Sign Up</CustomHeader>

      <CommonStyled.FormStyled
        layout="vertical"
        form={form}
        onFinish={onFinish}
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

        <Button type="primary" htmlType="submit" loading={isLoading}>
          Sign up
        </Button>
      </CommonStyled.FormStyled>
    </div>
  );
};

export default SignUp;
