import React, { useEffect, useState, useCallback } from "react";
import { get } from "lodash";
import styled from "styled-components";
import { Virtuoso } from "react-virtuoso";
import { useDispatch } from "react-redux";

import Post from "./Post";

import * as actions from "../../system/store/post/post.actions";

const PostContainer = ({ posts, loading, meta }) => {
  const dispatch = useDispatch();
  const [tempData, setTempData] = useState([]);

  const page = get(meta, "current_page");
  const limit = get(meta, "per_page");
  const totalPage = get(meta, "total_page");

  const isEnd = totalPage === page;

  useEffect(() => {
    if (!!posts) {
      setTempData((data) => [...tempData, ...posts]);
    }
  }, [posts]);

  const loadMore = () => {
    if (loading) {
      return;
    }

    if (isEnd) {
      return;
    }

    dispatch(actions.fetchPostListStart({ page: page + 1, limit }));
  };

  return (
    <PostContainerStyled>
      {/* {loading ? null : (
        <>
          {posts.map((post) => {
            const postId = get(post, "_id");

            return <Post key={postId} post={post} />;
          })}
        </>
      )} */}
      <Virtuoso
        totalCount={get(tempData, "length")}
        item={(index) => <Post post={tempData[index]} />}
        endReached={() => loadMore()}
        footer={() => {
          if (isEnd) return;
          return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
              Loading...
            </div>
          );
        }}
      />
    </PostContainerStyled>
  );
};

const PostContainerStyled = styled.div`
  margin-top: 24px;
`;

export default PostContainer;
