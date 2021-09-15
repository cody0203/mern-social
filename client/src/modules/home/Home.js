import React from "react";
import LazyLoad from "react-lazyload";

import CustomHeader from "../common/components/CustomHeader";

import Styled from "./Home.styles";
const Home = () => {
  return (
    <Styled.HomeBoxStyled>
      <CustomHeader>Welcome to Quackbook home page. Quack quack</CustomHeader>
      <LazyLoad height={450}>
        <Styled.HomeImageStyled src="https://source.unsplash.com/collection/398597/450x450" />
      </LazyLoad>
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
