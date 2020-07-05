import React from "react";
import { get } from "lodash";
import styled from "styled-components";
import PostForm from "../../post/PostForm";
import PostContainer from "../../post/PostContainer";
import { useSelector } from "react-redux";
import CustomCard from "../../common/components/CustomCard";

import * as actions from "../../../system/store/post/post.actions";

const NewFeeds = () => {
  const { createPostLoading } = useSelector((store) =>
    get(store, "postReducer")
  );
  return (
    <NewFeedsContainerStyled>
      <PostFormContainerStyled title="New Feeds" $customPadding="0">
        <PostForm
          action={actions.createPostStart}
          submitButtonTitle="Post"
          loading={createPostLoading}
        />
      </PostFormContainerStyled>
      <PostContainer />
    </NewFeedsContainerStyled>
  );
};

const NewFeedsContainerStyled = styled.div`
  flex: 1;
  margin: auto 24px 24px auto;
`;

const PostFormContainerStyled = styled(CustomCard)`
  .ant-card-body {
    padding: 0;
    background-color: ${({ theme }) => get(theme, "colors.background")};
  }
`;

export default NewFeeds;
