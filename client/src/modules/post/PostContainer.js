import React, { useEffect, useState, useLayoutEffect } from 'react';
import { get, isEmpty, unionBy, orderBy } from 'lodash';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Post from './Post';
import PostPlaceHolder from './PostPlaceHolder';

import * as actions from '../../system/store/post/post.actions';

const PostContainer = ({ posts, loading, page, totalPage, action }) => {
  const [tempData, setTempData] = useState([]);
  const [isBottom, setIsBottom] = useState(false);
  const { deletePostData } = useSelector((store) => get(store, 'postReducer.deletePost'));

  const isEnd = totalPage === page;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const isExistIndex = tempData.findIndex((item) => get(item, '_id') === get(deletePostData, '_id'));
    if (deletePostData && isExistIndex > -1) {
      const newData = [...tempData];
      newData.splice(isExistIndex, 1);
      setTempData(newData);
    }
  }, [deletePostData]);

  useEffect(() => {
    if (!loading) {
      setIsBottom(false);
    }
  }, [loading]);

  useEffect(() => {
    if (isBottom) {
      loadMore();
    }
  }, [isBottom]);

  useEffect(() => {
    const data = [
      ...tempData
        .concat(posts)
        .reduce((m, o) => m.set(o._id, Object.assign(m.get(o._id) || {}, o)), new Map())
        .values(),
    ];
    // const data = unionBy([...tempData, ...posts], '_id');
    setTempData(data);
  }, [posts]);

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const bottom = window.innerHeight + window.pageYOffset >= document.body.scrollHeight - 50;

    if (bottom) {
      setIsBottom(true);
    }
  };

  const loadMore = () => {
    if (loading) {
      return;
    }

    if (isEnd) {
      return;
    }
    action();
  };

  return (
    <PostContainerStyled>
      {loading && isEmpty(tempData) ? null : (
        <>
          {orderBy(tempData, ['created'], ['desc', 'asc']).map((post) => {
            const postId = get(post, '_id');

            return <Post key={postId} post={post} />;
          })}
        </>
      )}

      {loading && !isEmpty(tempData) && <PostPlaceHolder />}
    </PostContainerStyled>
  );
};

const PostContainerStyled = styled.div`
  margin-top: 24px;
`;

export default PostContainer;
