import React, { useEffect } from 'react';

import get from 'lodash/get';
import { List, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import auth from '../../system/auth/auth-helper';

import CustomHeader from '../common/components/CustomHeader';
import CustomAvatar from '../common/components/CustomAvatar';
import Styled from './User.styles';

import * as actions from '../../system/store/user/user.actions';
const User = () => {
  const dispatch = useDispatch();

  const { userListData, userListLoading } = useSelector((store) => get(store, 'userReducer.userList'));
  const { userInfo } = useSelector((store) => get(store, 'authReducer'));
  const id = get(userInfo, '_id');
  const { followUserLoading } = useSelector((store) => get(store, 'userReducer'));

  useEffect(() => {
    dispatch(actions.fetchUserListStart());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(actions.fetchWhoToFollowStart(id));
    }
  }, [id]);

  const followUserHandler = (followingId) => {
    dispatch(actions.followUserStart({ followerId: id, followingId }));
  };

  return (
    <div>
      <CustomHeader>Who to follow</CustomHeader>
      {userListLoading ? null : (
        <List
          bordered
          dataSource={userListData}
          rowKey={(record) => get(record, '_id')}
          renderItem={(item) => {
            const userName = get(item, 'name');
            const userId = get(item, '_id');
            return (
              <>
                {!auth.isAuthenticated() ? (
                  <List.Item>{userName}</List.Item>
                ) : (
                  <Styled.ListItemStyled>
                    {/* <Styled.ItemLinkStyled to={`/user/profile/${get(item, '_id')}`}> */}
                    <Styled.UserInfoContainer to={`/user/profile/${userId}`}>
                      <CustomAvatar
                        size={50}
                        src={`http://localhost:8080/api/user/avatar/${userId}?${new Date().getTime()}`}
                      />
                      <span className='user-name'>{userName}</span>
                    </Styled.UserInfoContainer>
                    <Button type='primary' onClick={followUserHandler.bind(this, userId)} loading={followUserLoading}>
                      Follow
                    </Button>
                    {/* </Styled.ItemLinkStyled> */}
                  </Styled.ListItemStyled>
                )}
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default User;
