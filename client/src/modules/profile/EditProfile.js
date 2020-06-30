import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import CustomHeader from '../common/components/CustomHeader';
import CustomInput from '../common/components/CustomInput';
import CommonStyled from '../common/styles/Form';
import CustomCard from '../common/components/CustomCard';
import CustomAvatar from '../common/components/CustomAvatar';

import Styled from './EditProfile.styles';

import * as actions from '../../system/store/user/user.actions';

const EditProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { userId } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tempUploadAvatar, setTempUploadAvatar] = useState([]);
  const { userProfileLoading, userProfileData } = useSelector((store) => get(store, 'userReducer.userProfile'));

  const { updateUserLoading, updateUserError } = useSelector((store) => get(store, 'userReducer.updateUser'));
  const name = get(userProfileData, 'name');
  const email = get(userProfileData, 'email');
  const bio = get(userProfileData, 'bio');

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

  const uploadProps = {
    onRemove: (file) => {
      setTempUploadAvatar(({ tempUploadAvatar }) => {
        const index = tempUploadAvatar.indexOf(file);
        const newFileList = tempUploadAvatar.slice();
        newFileList.splice(index, 1);
        return {
          tempUploadAvatar: newFileList,
        };
      });
    },
    beforeUpload: (file) => {
      setTempUploadAvatar((state) => ({
        tempUploadAvatar: [...state, file],
      }));
      return false;
    },
    tempUploadAvatar,
  };

  return (
    <div>
      {userProfileLoading ? null : (
        <CustomCard width={600} title={<CustomHeader>Edit Profile</CustomHeader>}>
          <Styled.AvatarContainer>
            <CustomAvatar size={70} />

            <Upload {...uploadProps} className='upload-container'>
              <Button>
                <UploadOutlined /> Upload
              </Button>
            </Upload>
          </Styled.AvatarContainer>
          <CommonStyled.FormStyled
            layout='vertical'
            form={form}
            onFinish={onFinish}
            initialValues={{
              name,
              email,
              bio,
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
              label='Bio'
              name='bio'
              type='textarea'
              rules={[
                {
                  required: true,
                  message: 'Please input your Bio!',
                },
              ]}
            />
            <CustomInput
              label='Password'
              name='password'
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your password!",
              //   },
              // ]}
              type='password'
            />

            <Button type='primary' htmlType='submit' loading={updateUserLoading}>
              Submit
            </Button>
          </CommonStyled.FormStyled>
        </CustomCard>
      )}
    </div>
  );
};

export default EditProfile;
