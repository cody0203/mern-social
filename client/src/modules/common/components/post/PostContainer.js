import React, { useEffect } from "react";
import { get } from "lodash";
import styled from "styled-components";
import { Card } from "antd";

import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../../../system/store/post/post.actions";

const Post = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchPostListStart());
  }, []);
  return <PostContainerStyled></PostContainerStyled>;
};

const PostContainerStyled = styled(Card)`
  margin: auto;
  border: 1px solid ${({ theme }) => get(theme, "colors.lineColor")};
`;

export default Post;
