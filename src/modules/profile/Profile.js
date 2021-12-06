import React, { useEffect, useState } from "react";
import get from "lodash/get";
import find from "lodash/find";
import { Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useParams, useHistory, Link } from "react-router-dom";
import moment from "moment";

import auth from "../../system/auth/auth-helper";

import CustomDeleteConfirmModal from "../common/components/CustomDeleteConfirmModal";
import CustomCard from "../common/components/CustomCard";
import CustomAvatar from "../common/components/CustomAvatar";

import ProfileTabs from "./components/ProfileTabs";

import Styled from "./Profile.styles";
import {
  useDeleteUser,
  useGetUserById,
  useGetUserInfo,
} from "../../system/api/user";
import { useFollowUserInProfile } from "../../system/api/follow";
import useUnfollowUser from "../../system/api/follow/useUnfollowUser";

const Profile = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { userId } = useParams();
  const history = useHistory();
  const { data: userProfileData, isLoading: userProfileLoading } =
    useGetUserById(userId);

  const { data: userInfo } = useGetUserInfo();
  const { mutate: deleteUser, isLoading: removeUserLoading } = useDeleteUser();

  const id = get(userInfo, "_id");
  const name = get(userProfileData, "name");
  const email = get(userProfileData, "email");
  const created = get(userProfileData, "created");
  const bio = get(userProfileData, "bio");
  const following = get(userProfileData, "following");
  const followers = get(userProfileData, "followers");
  const isFollowed = find(followers, { _id: id });

  const { mutate: onFollow, isLoading: followUserLoading } =
    useFollowUserInProfile();
  const { mutate: onUnfollow, isLoading: unFollowUserLoading } =
    useUnfollowUser(id);

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      closeModalHandler();
      history.push("/");
    }
  }, [auth.isAuthenticated()]);

  const openModalHandler = () => {
    setIsDeleteModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsDeleteModalOpen(false);
  };

  const removeUserHandler = () => {
    deleteUser(userId);
  };

  const followUserHandler = () => {
    onFollow({ followingId: userId, followerId: id });
  };

  const unFollowUserHandler = () => {
    onUnfollow({ unFollowingId: userId, unFollowerId: id });
  };

  let followButton = (
    <Button
      type="primary"
      onClick={followUserHandler}
      loading={followUserLoading}
    >
      Follow
    </Button>
  );

  if (isFollowed) {
    followButton = (
      <Button
        type="secondary"
        onClick={unFollowUserHandler}
        loading={unFollowUserLoading}
      >
        Unfollow
      </Button>
    );
  }

  return (
    <div>
      {userProfileLoading ? null : (
        <CustomCard width={700} title="Profile">
          <Styled.TopStyled>
            <Styled.TopContentStyled>
              <CustomAvatar size={70} id={userId} />
              <Styled.TextInfoStyled>
                <Styled.NameStyled>{name}</Styled.NameStyled>
                <p>{email}</p>
              </Styled.TextInfoStyled>
            </Styled.TopContentStyled>
            {id === userId ? (
              <div>
                <Link to={`/user/edit/${userId}`}>
                  <Styled.EditButtonStyled
                    icon={<EditOutlined />}
                    type="primary"
                    shape="circle"
                  />
                </Link>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  shape="circle"
                  onClick={openModalHandler}
                />
              </div>
            ) : (
              <>{followButton}</>
            )}
          </Styled.TopStyled>
          <Styled.BottomStyled>
            <p>{bio}</p>
            <p>Joined: {moment(created).format("YYYY-MM-DD")}</p>

            <ProfileTabs
              followers={followers}
              following={following}
              userId={userId}
            />
          </Styled.BottomStyled>
        </CustomCard>
      )}

      <CustomDeleteConfirmModal
        visible={isDeleteModalOpen}
        onCancel={closeModalHandler}
        title="Delete Account"
        desc="Confirm to delete your account."
        onOk={removeUserHandler}
        loading={removeUserLoading}
      />
    </div>
  );
};

export default Profile;
