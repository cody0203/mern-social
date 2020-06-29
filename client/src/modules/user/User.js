import React, { useEffect } from "react";

import get from "lodash/get";
import { List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import auth from "../../system/auth/auth-helper";

import CustomHeader from "../common/components/CustomHeader";
import Styled from "./User.styles";

import * as actions from "../../system/store/user/user.actions";
const User = () => {
  const dispatch = useDispatch();

  const { userListData, userListLoading } = useSelector((store) =>
    get(store, "userReducer.userList")
  );
  useEffect(() => {
    dispatch(actions.fetchUserListStart());
  }, []);

  return (
    <div>
      <CustomHeader>User List</CustomHeader>
      {userListLoading ? null : (
        <List
          bordered
          dataSource={userListData}
          renderItem={(item) => (
            <>
              {!auth.isAuthenticated() ? (
                <List.Item>{item.name}</List.Item>
              ) : (
                <Link to={`/user/profile/${get(item, "_id")}`}>
                  <Styled.ListItemStyled>
                    {item.name}
                    <Styled.OpenDetailButtonStyled />
                  </Styled.ListItemStyled>
                </Link>
              )}
            </>
          )}
        />
      )}
    </div>
  );
};

export default User;
