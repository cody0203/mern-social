import React, { useEffect, useRef, useCallback } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import orderBy from "lodash/orderBy";
import styled from "styled-components";

import Post from "./Post";
import { useGetPostList } from "../../system/api/post";

const PostContainer = ({ id }) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useGetPostList({
    id,
  });
  const loader = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (!hasNextPage) return;
      if (target.isIntersecting) {
        fetchNextPage();
      }
    },
    [hasNextPage]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <PostContainerStyled>
      {isLoading && isEmpty(data) ? null : (
        <>
          {data.pages.map((page) => (
            <React.Fragment key={page.currentPage}>
              {orderBy(page.data, ["created"], ["desc", "asc"]).map((post) => {
                const postId = get(post, "_id");
                return <Post key={postId} post={post} />;
              })}
            </React.Fragment>
          ))}
        </>
      )}
      <div ref={loader} />
    </PostContainerStyled>
  );
};

const PostContainerStyled = styled.div`
  margin-top: 24px;
`;

export default PostContainer;
