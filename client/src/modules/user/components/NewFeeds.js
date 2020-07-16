import React, { useEffect } from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import PostForm from '../../post/PostForm';
import PostContainer from '../../post/PostContainer';
import { useSelector, useDispatch } from 'react-redux';
import CustomCard from '../../common/components/CustomCard';

import * as actions from '../../../system/store/post/post.actions';

const NewFeeds = () => {
  const dispatch = useDispatch();
  const { postListData, postListLoading, postListMeta } = useSelector((store) => get(store, 'postReducer.postList'));

  const page = get(postListMeta, 'current_page');
  const limit = get(postListMeta, 'per_page');
  const totalPage = get(postListMeta, 'total_page');

  useEffect(() => {
    dispatch(actions.fetchPostListStart({}));
  }, []);

  const { createPostLoading } = useSelector((store) => get(store, 'postReducer'));

  const fetchMorePost = () => {
    dispatch(actions.fetchPostListStart({ page: page + 1, limit }));
  };
  return (
    <NewFeedsContainerStyled>
      <PostFormContainerStyled title='New Feeds' $customPadding='0'>
        <PostForm action={actions.createPostStart} submitButtonTitle='Post' loading={createPostLoading} />
      </PostFormContainerStyled>
      <PostContainer
        posts={postListData}
        loading={postListLoading}
        page={page}
        totalPage={totalPage}
        action={fetchMorePost}
      />
    </NewFeedsContainerStyled>
  );
};

const NewFeedsContainerStyled = styled.div`
  flex: 1;
  margin: auto 24px 24px auto;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const PostFormContainerStyled = styled(CustomCard)`
  .ant-card-body {
    padding: 0;
    background-color: ${({ theme }) => get(theme, 'colors.background')};
  }
`;

export default NewFeeds;
