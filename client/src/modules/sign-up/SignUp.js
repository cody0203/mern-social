import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'antd';
import get from 'lodash/get';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, gql } from '@apollo/client';

import CustomHeader from '../common/components/CustomHeader';
import CustomInput from '../common/components/CustomInput';
import CommonStyled from '../common/styles/Form';

import * as actions from '../../system/store/user/user.actions';
import { useHistory } from 'react-router';

const SIGN_UP = gql`
  mutation SignIn($userInput: UserInputData!) {
    createUser(userInput: $userInput) {
      email
      name
      password
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [createUser, { data }] = useMutation(SIGN_UP);

  // const { signUpLoading, signUpStatus, signUpError } = useSelector((store) =>
  //   get(store, "userReducer.signUp")
  // );

  // useEffect(() => {
  //   if (!signUpLoading) {
  //     onClearForm();
  //   }
  // }, [signUpLoading]);

  // useEffect(() => {
  //   if (signUpStatus) {
  //     signUpSuccessHandler();
  //   }
  // }, [signUpStatus]);

  // useEffect(() => {
  //   if (signUpError) {
  //     signUpErrorHandler();
  //   }
  // }, [signUpError]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(actions.clearSignUpState());
  //   };
  // }, []);

  const onFinish = (values) => {
    dispatch(actions.signUpStart({ ...values }));
  };

  const onClearForm = () => {
    form.resetFields();
  };

  const signUpSuccessHandler = () => {
    Modal.success({
      title: 'Sign up success!',
      content: 'New account successfully created.',
      okText: 'Sign in',
      onOk: () => history.push('/sign-in'),
    });
  };

  // const signUpErrorHandler = () => {
  //   Modal.error({
  //     title: 'Sign up error',
  //     content: signUpError,
  //     okText: 'Try again',
  //   });
  // };

  return (
    <div>
      <CustomHeader>Sign Up</CustomHeader>

      <CommonStyled.FormStyled
        layout='vertical'
        form={form}
        onFinish={(values) => {
          createUser({ variables: { ...values } });
        }}
      >
        <CustomInput
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        />
        <CustomInput
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        />
        <CustomInput
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          type='password'
        />

        <Button type='primary' htmlType='submit'>
          Sign up
        </Button>
      </CommonStyled.FormStyled>
    </div>
  );
};

export default SignUp;
