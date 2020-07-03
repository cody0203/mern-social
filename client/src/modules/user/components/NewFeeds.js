import React from 'react';
import styled from 'styled-components';
import PostForm from '../../common/components/post/PostForm';
import PostContainer from '../../common/components/post/PostContainer';

const NewFeeds = () => {
  return (
    <NewFeedsContainerStyled>
      <PostForm />
      <PostContainer />
    </NewFeedsContainerStyled>
  );
};

const NewFeedsContainerStyled = styled.div`
  flex: 1;
  margin: auto 24px 24px auto;
`;

export default NewFeeds;
