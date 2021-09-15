import React, { useEffect } from 'react';
import get from 'lodash/get';
import { List, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import auth from '../../system/auth/auth-helper';
import WhoToFollow from './components/WhoToFollow';
import NewFeeds from './components/NewFeeds';
import CustomHeader from '../common/components/CustomHeader';
import CustomAvatar from '../common/components/CustomAvatar';

import Styled from './User.styles';
import * as actions from '../../system/store/user/user.actions';
const User = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((store) => get(store, 'authReducer'));
  const id = get(userInfo, '_id');

  useEffect(() => {
    dispatch(actions.fetchUserListStart());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(actions.fetchWhoToFollowStart(id));
    }
  }, [id]);

  return (
    <Styled.MainContainerStyled>
      <NewFeeds />
      <WhoToFollow id={id} auth={auth} />
    </Styled.MainContainerStyled>
  );
};

export default User;
