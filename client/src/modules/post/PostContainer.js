import React, { useEffect } from "react";
import { get } from "lodash";
import styled from "styled-components";
import { Card } from "antd";
import { useSelector, useDispatch } from "react-redux";

import Post from "./Post";

import * as actions from "../../system/store/post/post.actions";

const PostContainer = () => {
  const dispatch = useDispatch();
  const { postListData, postListLoading } = useSelector((store) =>
    get(store, "postReducer.postList")
  );

  useEffect(() => {
    dispatch(actions.fetchPostListStart());
  }, []);
  return (
    <PostContainerStyled>
      {postListLoading ? null : (
        <>
          {postListData.map((post) => {
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
