import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';

const Post = () => {
  return <PostContainerStyled></PostContainerStyled>;
};

const PostContainerStyled = styled.div`
  width: 100%;
  min-height: 100px;

  margin: 24px auto auto auto;
  border: 1px solid ${({ theme }) => get(theme, 'colors.lineColor')};
`;

export default Post;
