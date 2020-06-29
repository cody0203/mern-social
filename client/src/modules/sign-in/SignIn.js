import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "antd";
import get from "lodash/get";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import CustomHeader from "../common/components/CustomHeader";
import CustomInput from "../common/components/CustomInput";
import CommonStyled from "../common/styles/Form";

import * as actions from "../../system/store/auth/auth.actions";

import auth from "../../system/auth/auth-helper";

const SignIn = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { signInLoading, signInError } = useSelector((store) =>
    get(store, "authReducer.signIn")
  );

  useEffect(() => {
    if (!signInLoading && !signInError) {
      onClearForm();
    }
  }, [signInLoading, signInError]);

  useEffect(() => {
    if (signInError) {
      signUpErrorHandler();
    }
  }, [signInError]);

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());
  }, [auth.isAuthenticated(), signInLoading]);

  useEffect(() => {
    return () => {
      dispatch(actions.clearSignInState());
    };
  }, []);

  const onFinish = (values) => {
    dispatch(actions.signInStart({ ...values }));
  };

  const onClearForm = () => {
    form.resetFields();
  };

  const signUpErrorHandler = () => {
    Modal.error({
      title: "Sign up error",
      content: signInError,
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

        <Button type="primary" htmlType="submit" loading={signInLoading}>
          Sign in
        </Button>
      </CommonStyled.FormStyled>
    </div>
  );
};

export default SignIn;
