import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import { Input, Button } from 'antd';

import CustomAvatar from '../../common/components/CustomAvatar';
import CustomCard from '../../common/components/CustomCard';

const { TextArea } = Input;

const NewFeeds = ({ userInfo, id }) => {
  const name = get(userInfo, 'name');
  return (
    <NewFeedsContainerStyled>
      <CustomCard title='New Feeds' $customPadding='0 0 16px 0'>
        <StatusFormStyled>
          <UserInfoContainer>
            <CustomAvatar size={50} src={`http://localhost:8080/api/user/avatar/${id}?${new Date().getTime()}`} />
            <span className='user-name'>{name}</span>
          </UserInfoContainer>
          <TextArea placeholder="What's on your mind?" rows={5} />
          <PostButtonStyled type='primary'>Post</PostButtonStyled>
        </StatusFormStyled>
      </CustomCard>
    </NewFeedsContainerStyled>
  );
};

const NewFeedsContainerStyled = styled.div`
  flex: 1;
  max-width: 700px;
  margin-right: 24px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .user-name {
    font-size: 16px;
    font-weight: 500;
    margin-left: 16px;
  }
`;

const StatusFormStyled = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => get(theme, 'colors.background')};
  border-radius: 2px;
  margin-bottom: 16px;
`;

const PostButtonStyled = styled(Button)`
  margin-top: 24px;
`;

export default NewFeeds;
