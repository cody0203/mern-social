import React, { useEffect, useState } from 'react';
import get from 'lodash/get';
import find from 'lodash/find';
import { Button, Tabs } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import moment from 'moment';

import auth from '../../system/auth/auth-helper';
import * as actions from '../../system/store/user/user.actions';

import CustomHeader from '../common/components/CustomHeader';
import CustomDeleteConfirmModal from '../common/components/CustomDeleteConfirmModal';
import CustomCard from '../common/components/CustomCard';
import CustomAvatar from '../common/components/CustomAvatar';

import ProfileTabs from './components/ProfileTabs';

import Styled from './Profile.styles';

const { TabPane } = Tabs;

const Profile = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const history = useHistory();
  const { userProfileLoading, userProfileData } = useSelector((store) => get(store, 'userReducer.userProfile'));
  const { removeUserLoading, followUserLoading, unFollowUserLoading } = useSelector((store) =>
    get(store, 'userReducer')
  );
  const { userInfo } = useSelector((store) => get(store, 'authReducer'));
  const id = get(userInfo, '_id');
  const name = get(userProfileData, 'name');
  const email = get(userProfileData, 'email');
  const created = get(userProfileData, 'created');
  const bio = get(userProfileData, 'bio');
  const avatar = get(userProfileData, 'avatar');
  const posts = get(userProfileData, 'posts');
  const following = get(userProfileData, 'following');
  const followers = get(userProfileData, 'followers');
  const isFollowed = find(followers, { _id: id });

  useEffect(() => {
    dispatch(actions.fetchUserStart(userId));
  }, [userId]);

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      closeModalHandler();
      history.push('/');
    }
  }, [auth.isAuthenticated()]);

  const openModalHandler = () => {
    setIsDeleteModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsDeleteModalOpen(false);
  };

  const removeUserHandler = () => {
    dispatch(actions.removeUserStart(userId));
  };

  const followUserHandler = () => {
    dispatch(actions.followUserStart({ followingId: userId, followerId: id }));
  };

  const unFollowUserHandler = () => {
    dispatch(actions.unFollowUserStart({ unFollowingId: userId, unFollowerId: id }));
  };

  let followButton = (
    <Button type='primary' onClick={followUserHandler} loading={followUserLoading}>
      Follow
    </Button>
  );

  if (isFollowed) {
    followButton = (
      <Button type='primary' onClick={unFollowUserHandler} loading={unFollowUserLoading}>
        Unfollow
      </Button>
    );
  }

  return (
    <div>
      {userProfileLoading ? null : (
        <CustomCard title={<CustomHeader>Profile</CustomHeader>}>
          <Styled.TopStyled>
            <Styled.TopContentStyled>
              <CustomAvatar
                size={70}
                src={avatar ? `http://localhost:8080/api/user/avatar/${userId}?${new Date().getTime()}` : null}
              />
              <Styled.TextInfoStyled>
                <Styled.NameStyled>{name}</Styled.NameStyled>
                <p>{email}</p>
              </Styled.TextInfoStyled>
            </Styled.TopContentStyled>
            {id === userId ? (
              <div>
                <Link to={`/user/edit/${userId}`}>
                  <Styled.EditButtonStyled icon={<EditOutlined />} type='primary' shape='circle' />
                </Link>
                <Button danger icon={<DeleteOutlined />} shape='circle' onClick={openModalHandler} />
              </div>
            ) : (
              <>{followButton}</>
            )}
          </Styled.TopStyled>
          <Styled.BottomStyled>
            <p>{bio}</p>
            <p>Joined: {moment(created).format('YYYY-MM-DD')}</p>

            <ProfileTabs posts={posts} followers={followers} following={following} />
          </Styled.BottomStyled>
        </CustomCard>
      )}

      <CustomDeleteConfirmModal
        visible={isDeleteModalOpen}
        onCancel={closeModalHandler}
        title='Delete Account'
        desc='Confirm to delete your account.'
        onOk={removeUserHandler}
        loading={removeUserLoading}
      />
    </div>
  );
};

export default Profile;
