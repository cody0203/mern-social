import React from "react";
import { get } from "lodash";
import styled from "styled-components";

import Post from "./Post";

const PostContainer = ({ posts, loading }) => {
  return (
    <PostContainerStyled>
      {loading ? null : (
        <>
          {posts.map((post) => {
            const postId = get(post, "_id");

            return <Post key={postId} post={post} />;
          })}
        </>
      )}
    </PostContainerStyled>
  );
};

const PostContainerStyled = styled.div`
  margin-top: 24px;
`;

export default PostContainer;
