import React from 'react';
import styled from 'styled-components';

import CustomHeader from '../../common/components/CustomHeader';
import CustomCard from '../../common/components/CustomCard';

const NewFeeds = () => {
  return (
    <NewFeedsContainerStyled>
      <CustomCard title='New Feeds'></CustomCard>
    </NewFeedsContainerStyled>
  );
};

const NewFeedsContainerStyled = styled.div`
  flex: 1;
  max-width: 700px;
  margin-right: 24px;
`;

export default NewFeeds;
