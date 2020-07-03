import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { get, isEmpty } from 'lodash';
import { Input, Button, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalOutlined } from '@ant-design/icons';
import CustomAvatar from '../CustomAvatar';
import CustomCard from '../CustomCard';

import * as constants from './constants';

import * as actions from '../../../../system/store/post/post.actions';

const { TextArea } = Input;
const { Option } = Select;

const PostForm = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [isPublicPost, setIsPublicPost] = useState('public');
  const { userInfo } = useSelector((store) => get(store, 'authReducer'));
  const { createPostLoading } = useSelector((store) => get(store, 'postReducer'));
  const id = get(userInfo, '_id');
  const name = get(userInfo, 'name');

  useEffect(() => {
    if (!createPostLoading) {
      setValue('');
      setIsPublicPost('public');
    }
  }, [createPostLoading]);

  const onChangeCommentHandler = (e) => {
    const value = get(e, 'target.value');

    setValue(value);
  };

  const changePrivacyPostHandler = (value) => {
    setIsPublicPost(value);
  };

  const createPostHandler = () => {
    if (isEmpty(value)) return;
    const isPublic = isPublicPost === 'public' ? true : false;
    dispatch(actions.createPostStart({ content: value, public: isPublic }));
  };

  return (
    <CustomCard title='New Feeds' $customPadding='0'>
      <StatusFormStyled>
        <UserInfoContainer>
          <CustomAvatar size={50} src={`http://localhost:8080/api/user/avatar/${id}?${new Date().getTime()}`} />
          <span className='user-name'>{name}</span>
        </UserInfoContainer>
        <TextArea placeholder="What's on your mind?" rows={5} value={value} onChange={onChangeCommentHandler} />
        <Select onChange={changePrivacyPostHandler} value={isPublicPost}>
          {constants.privacyOptions.map((option) => (
            <Option value={option.value} key={option.value}>
              <div>
                {option.icon}
                <PrivacyOptionValue>{option.text}</PrivacyOptionValue>
              </div>
            </Option>
          ))}
        </Select>
        <PostButtonStyled
          type='primary'
          disabled={isEmpty(value)}
          onClick={createPostHandler}
          loading={createPostLoading}
        >
          Post
        </PostButtonStyled>
      </StatusFormStyled>
    </CustomCard>
  );
};

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  .user-name {
    font-size: 16px;
    font-weight: 500;
    margin-left: 16px;
  }
`;

const StatusFormStyled = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => get(theme, 'colors.background')};
  border-radius: 2px;
`;

const PostButtonStyled = styled(Button)`
  margin: 24px 0 0 16px;
`;

const PrivacyOptionValue = styled.span`
  margin-left: 10px;
`;

export default PostForm;
