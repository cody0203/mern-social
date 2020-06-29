import React from "react";

import CustomHeader from "../common/components/CustomHeader";

import Styled from "./Home.styles";
const Home = () => {
  return (
    <Styled.HomeBoxStyled>
      <CustomHeader>Welcome to MERN Skeleton home page</CustomHeader>
      <Styled.HomeImageStyled src="https://source.unsplash.com/collection/398597/450x450" />
      <p>
        Photo on{" "}
        <a href="https://unsplash.com/" target="_blank">
          Unsplash
        </a>
      </p>
    </Styled.HomeBoxStyled>
  );
};

export default Home;
