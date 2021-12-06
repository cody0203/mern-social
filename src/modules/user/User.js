import React from "react";

import WhoToFollow from "./components/WhoToFollow";
import NewFeeds from "./components/NewFeeds";

import Styled from "./User.styles";

const User = () => {
  return (
    <Styled.MainContainerStyled>
      <NewFeeds />
      <WhoToFollow />
    </Styled.MainContainerStyled>
  );
};

export default User;
