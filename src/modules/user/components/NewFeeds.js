import React from "react";
import get from "lodash/get";
import styled from "styled-components";
import PostForm from "../../post/PostForm";
import PostContainer from "../../post/PostContainer";
import CustomCard from "../../common/components/CustomCard";

import { useGetPostList, usePosting } from "../../../system/api/post";

const NewFeeds = () => {
  const { mutate, isLoading } = usePosting();

  const { isLoading: getPostListLoading } = useGetPostList({});

  if (getPostListLoading) return null;

  return (
    <NewFeedsContainerStyled>
      <PostFormContainerStyled title="New Feeds" $customPadding="0">
        <PostForm
          action={mutate}
          submitButtonTitle="Post"
          loading={isLoading}
        />
      </PostFormContainerStyled>
      <PostContainer />
    </NewFeedsContainerStyled>
  );
};

const NewFeedsContainerStyled = styled.div`
  flex: 1;
  margin: 0 24px 24px auto;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const PostFormContainerStyled = styled(CustomCard)`
  .ant-card-body {
    padding: 0;
    background-color: ${({ theme }) => get(theme, "colors.background")};
  }
`;

export default NewFeeds;
