import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { get, includes } from 'lodash';
import { useSelector } from 'react-redux';
import { Input } from 'antd';

import CustomAvatar from '../common/components/CustomAvatar';

const CommentField = forwardRef((props, ref) => {
  const { ownerId, value, onPressEnter, onChange, currentId, targetId, loading } = props;

  const isCommenting = currentId === targetId;
  const { userInfo } = useSelector((store) => get(store, 'authReducer'));
  const id = get(userInfo, '_id');

  return (
    <>
      <CommentInputContainer>
        <CustomAvatar size={30} src={`http://localhost:8080/api/user/avatar/${id}?${new Date().getTime()}`} />

        <CommentInput
          ref={ref}
          placeholder='Write a comment...'
          value={value}
          onPressEnter={onPressEnter}
          onChange={onChange}
          // disabled={isCommenting && loading}
        />
      </CommentInputContainer>
    </>
  );
});

const CommentInputContainer = styled.div`
  display: flex;
  margin: 0 16px 16px 16px;
`;

const CommentInput = styled(Input)`
  margin-left: 16px;
  border-radius: 50px;
`;

export default CommentField;
