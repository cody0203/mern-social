import React from "react";
import get from "lodash/get";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

import CustomAvatar from "../../common/components/CustomAvatar";
import PostContainer from "../../post/PostContainer";

const { TabPane } = Tabs;

const ProfileTabs = ({ posts, following, followers, loading }) => {
  return (
    <TabContainerStyled type="card">
      <TabPane tab="Posts" key="posts">
        <PostContainer posts={posts} loading={loading} />
      </TabPane>
      <TabPanelStyled tab="Following" key="following">
        {following.map((people) => {
          const id = get(people, "_id");
          const name = get(people, "name");

          return (
            <UserItemStyled key={id} to={`/user/profile/${id}`}>
              <CustomAvatar
                size={70}
                src={`http://localhost:8080/api/user/avatar/${id}?${new Date().getTime()}`}
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
                src={`http://localhost:8080/api/user/avatar/${id}?${new Date().getTime()}`}
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
