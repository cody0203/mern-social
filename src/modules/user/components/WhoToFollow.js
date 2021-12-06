import React, { useState } from "react";
import get from "lodash/get";
import styled from "styled-components";
import { List, Button } from "antd";
import { Link } from "react-router-dom";

import CustomAvatar from "../../common/components/CustomAvatar";
import CustomCard from "../../common/components/CustomCard";

import { useGetUserInfo } from "../../../system/api/user";
import auth from "../../../system/auth/auth-helper";
import {
  useFollowUserInList,
  useGetFollowList,
} from "../../../system/api/follow";

const WhoToFollow = () => {
  const { data } = useGetUserInfo();
  const id = get(data, "_id");
  const [followingId, setFollowingId] = useState(null);

  const { data: userListData, isLoading: userListLoading } =
    useGetFollowList(id);

  const { mutate, isLoading: followUserLoading } = useFollowUserInList();

  const followUserHandler = (followingId) => {
    setFollowingId(followingId);
    mutate({ followerId: id, followingId });
  };

  if (userListLoading || !id) return <WhoToFollowContainerStyled />;

  return (
    <WhoToFollowContainerStyled>
      <CustomCard title="Who to follow">
        {userListLoading ? null : (
          <ListStyled
            dataSource={userListData}
            rowKey={(record) => get(record, "_id")}
            renderItem={(item) => {
              const userName = get(item, "name");
              const userId = get(item, "_id");
              return (
                <>
                  {!auth.isAuthenticated() ? (
                    <List.Item>{userName}</List.Item>
                  ) : (
                    <ListItemStyled>
                      <UserInfoContainer to={`/user/profile/${userId}`}>
                        <CustomAvatar size={50} id={userId} />
                        <span className="user-name">{userName}</span>
                      </UserInfoContainer>
                      <Button
                        type="primary"
                        onClick={followUserHandler.bind(this, userId)}
                        loading={followUserLoading && userId === followingId}
                      >
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
      color: ${({ theme }) => get(theme, "colors.primary")};
    }
  }
`;

export default WhoToFollow;
