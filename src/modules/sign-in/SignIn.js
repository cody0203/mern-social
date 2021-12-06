import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "antd";
import { Redirect } from "react-router-dom";

import CustomHeader from "../common/components/CustomHeader";
import CustomInput from "../common/components/CustomInput";
import CommonStyled from "../common/styles/Form";

import auth from "../../system/auth/auth-helper";
import { useLogin } from "../../system/api/auth";

const SignIn = () => {
  const [form] = Form.useForm();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { error, mutate, isLoading, isError } = useLogin();

  useEffect(() => {
    if (!isLoading && !isError) {
      onClearForm();
    }
  }, [isLoading, isError]);

  useEffect(() => {
    if (isError) {
      signUpErrorHandler();
    }
  }, [isError]);

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());
  }, [isLoading]);

  const onFinish = (values) => {
    mutate(values);
  };

  const onClearForm = () => {
    form.resetFields();
  };

  const signUpErrorHandler = () => {
    Modal.error({
      title: "Sign up error",
      content: error,
      okText: "Try again",
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <CustomHeader>Sign In</CustomHeader>

      <CommonStyled.FormStyled
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
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
          Sign in
        </Button>
      </CommonStyled.FormStyled>
    </div>
  );
};

export default SignIn;
