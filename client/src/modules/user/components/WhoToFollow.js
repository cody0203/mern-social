import React, { useEffect } from 'react';
import get from 'lodash/get';
import styled from 'styled-components';
import { List, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

import CustomHeader from '../../common/components/CustomHeader';
import CustomAvatar from '../../common/components/CustomAvatar';
import CustomCard from '../../common/components/CustomCard';

import * as actions from '../../../system/store/user/user.actions';

const WhoToFollow = ({ id, auth }) => {
  const dispatch = useDispatch();

  const { userListData, userListLoading } = useSelector((store) => get(store, 'userReducer.userList'));
  const { followUserLoading } = useSelector((store) => get(store, 'userReducer'));

  const followUserHandler = (followingId) => {
    dispatch(actions.followUserStart({ followerId: id, followingId }));
  };

  return (
    <WhoToFollowContainerStyled>
      <CustomCard title='Who to follow'>
        {/* <CustomHeader>Who to follow</CustomHeader> */}
        {userListLoading ? null : (
          <ListStyled
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
                    <ListItemStyled>
                      {/* <ItemLinkStyled to={`/user/profile/${get(item, '_id')}`}> */}
                      <UserInfoContainer to={`/user/profile/${userId}`}>
                        <CustomAvatar size={50} id={userId} />
                        <span className='user-name'>{userName}</span>
                      </UserInfoContainer>
                      <Button type='primary' onClick={followUserHandler.bind(this, userId)} loading={followUserLoading}>
                        Follow
                      </Button>
                      {/* </ItemLinkStyled> */}
                    </ListItemStyled>
                  )}
                </>
              );
            }}
          />
        )}
      </CustomCard>
    </WhoToFollowContainerStyled>
  );
};

const WhoToFollowContainerStyled = styled.div`
  flex: 0.7;
`;

const ListStyled = styled(List)`
  border-color: #f0f0f0;
`;

const ListItemStyled = styled(List.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemLinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  padding: 16px 24px;
  &:hover {
    background-color: ${({ theme }) => get(theme, 'colors.lineColor')};
  }
`;

const UserInfoContainer = styled(Link)`
  display: flex;
  align-items: center;

  .user-name {
    font-size: 16px;
    font-weight: 500;
    margin-left: 10px;
  }

  &:hover {
    .user-name {
      color: ${({ theme }) => get(theme, 'colors.primary')};
    }
  }
`;

const OpenDetailButtonStyled = styled(ArrowRightOutlined)`
  color: ${({ theme }) => get(theme, 'colors.primary')};
`;

export default WhoToFollow;
