import React, { useEffect } from 'react';

import get from 'lodash/get';
import { List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import auth from '../../system/auth/auth-helper';

import CustomHeader from '../common/components/CustomHeader';
import Styled from './User.styles';

import * as actions from '../../system/store/user/user.actions';
const User = () => {
  const dispatch = useDispatch();

  const { userListData, userListLoading } = useSelector((store) => get(store, 'userReducer.userList'));
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
    <div>
      <CustomHeader>Who to follow</CustomHeader>
      {userListLoading ? null : (
        <List
          bordered
          dataSource={userListData}
          renderItem={(item) => (
            <>
              {!auth.isAuthenticated() ? (
                <List.Item>{item.name}</List.Item>
              ) : (
                <Styled.ListItemStyled>
                  <Styled.ItemLinkStyled to={`/user/profile/${get(item, '_id')}`}>
                    {item.name}
                    <Styled.OpenDetailButtonStyled />
                  </Styled.ItemLinkStyled>
                </Styled.ListItemStyled>
              )}
            </>
          )}
        />
      )}
    </div>
  );
};

export default User;
