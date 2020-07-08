import React from "react";
import { get } from "lodash";
import styled from "styled-components";
import { Skeleton } from "antd";

const PostPlaceHolder = () => {
  return <PostPlaceHolderStyled avatar paragraph={{ rows: 2 }} />;
};

const PostPlaceHolderStyled = styled(Skeleton)`
  background-color: white;
  border: 1px solid ${({ theme }) => get(theme, "colors.lineColor")};
  padding: 16px 24px 100px 24px;
  margin-bottom: 24px;
`;

export default PostPlaceHolder;
