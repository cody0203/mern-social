import React, { useEffect, useState } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { Avatar, Button } from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import moment from "moment";

import auth from "../../system/auth/auth-helper";

import * as actions from "../../system/store/user/user.actions";

import CustomHeader from "../common/components/CustomHeader";
import CustomDeleteConfirmModal from "../common/components/CustomDeleteConfirmModal";

import Styled from "./Profile.styles";

const Profile = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const history = useHistory();
  const { userProfileLoading, userProfileData } = useSelector((store) =>
    get(store, "userReducer.userProfile")
  );
  const { removeUserLoading } = useSelector((store) =>
    get(store, "userReducer")
  );
  const { userInfo } = useSelector((store) => get(store, "authReducer"));

  const name = get(userProfileData, "name");
  const email = get(userProfileData, "email");
  const created = get(userProfileData, "created");

  useEffect(() => {
    dispatch(actions.fetchUserStart(userId));
  }, []);

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
    dispatch(actions.removeUserStart(userId));
  };

  return (
    <div>
      {userProfileLoading ? null : (
        <Styled.ProfileBoxStyled title={<CustomHeader>Profile</CustomHeader>}>
          <Styled.TopStyled>
            <Avatar icon={<UserOutlined />} size={40} />
            <Styled.TextInfoStyled>
              <p>{name}</p>
              <p>{email}</p>
            </Styled.TextInfoStyled>
          </Styled.TopStyled>
          <Styled.BottomStyled>
            <p>Joined: {moment(created).format("YYYY-MM-DD")}</p>

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
          </Styled.BottomStyled>
        </Styled.ProfileBoxStyled>
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
