import React from "react";
import get from "lodash/get";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import CustomAvatar from "../../common/components/CustomAvatar";
import PostContainer from "../../post/PostContainer";

import * as actions from "../../../system/store/post/post.actions";

const { TabPane } = Tabs;

const ProfileTabs = ({
  posts,
  following,
  followers,
  loading,
  meta,
  userId,
}) => {
  const dispatch = useDispatch();
  const page = get(meta, "current_page");
  const limit = get(meta, "per_page");
  const totalPage = get(meta, "total_page");

  const fetchMoreUserPost = () => {
    dispatch(
      actions.fetchUserPostStart({
        id: userId,
        params: { page: page + 1, limit },
      })
    );
  };

  return (
    <TabContainerStyled type="card">
      <TabPane tab="Posts" key="posts">
        <PostContainer
          posts={posts}
          loading={loading}
          action={fetchMoreUserPost}
          page={page}
          totalPage={totalPage}
        />
      </TabPane>
      <TabPanelStyled tab="Following" key="following">
        {following.map((people) => {
          const id = get(people, "_id");
          const name = get(people, "name");

          return (
            <UserItemStyled key={id} to={`/user/profile/${id}`}>
              <CustomAvatar
                size={70}
                id={id}
              />
              <UserName>{name}</UserName>
            </UserItemStyled>
          );
        })}
      </TabPanelStyled>
      <TabPanelStyled tab="Followers" key="followers">
        {followers.map((people) => {
          const id = get(people, "_id");
          const name = get(people, "name");
          return (
            <UserItemStyled key={id} to={`/user/profile/${id}`}>
              <CustomAvatar
                size={70}
                id={id}
              />
              <UserName>{name}</UserName>
            </UserItemStyled>
          );
        })}
      </TabPanelStyled>
    </TabContainerStyled>
  );
};

const TabContainerStyled = styled(Tabs)`
  margin-top: 16px;

  .ant-tabs-nav-list {
    width: 100%;

    .ant-tabs-tab {
      display: block;
      width: calc(100% / 3);
      text-align: center;
    }
  }
`;

const TabPanelStyled = styled(TabPane)`
  display: flex;
  flex-flow: wrap;
`;

const UserItemStyled = styled(Link)`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-right: 20px;
`;

const UserName = styled.p`
  margin-top: 6px;
  font-weight: 500;
  font-size: 16px;
`;

export default ProfileTabs;
