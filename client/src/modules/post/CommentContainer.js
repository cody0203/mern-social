import React from "react";
import { get } from "lodash";
import styled from "styled-components";

import Comment from "./Comment";

const CommentContainer = ({ comments }) => {
  return (
    <CommentContainerStyled>
      {comments &&
        comments.map((comment) => {
          const id = get(comment, "_id");
          return <Comment key={id} comment={comment} />;
        })}
    </CommentContainerStyled>
  );
};

const CommentContainerStyled = styled.div``;

export default CommentContainer;
