import React from "react";
import { get } from "lodash";
import styled from "styled-components";
import { Link } from "react-router-dom";

import CustomAvatar from "../common/components/CustomAvatar";

const Comment = ({ comment }) => {
  const posterId = get(comment, "poster._id");
  const posterName = get(comment, "poster.name");
  const content = get(comment, "content");
  return (
    <CommentStyled>
      <Link to={`/user/profile/${posterId}`}>
        <CustomAvatar
          size={30}
          src={`http://localhost:8080/api/user/avatar/${posterId}?${new Date().getTime()}`}
        />
      </Link>
      <ContentStyled to={`/user/profile/${posterId}`}>
        <PosterNameStyled>{posterName}</PosterNameStyled> {content}
      </ContentStyled>
    </CommentStyled>
  );
};

const CommentStyled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const PosterNameStyled = styled(Link)`
  color: ${({ theme }) => get(theme, "colors.primary")};
  font-weight: 500;
`;

const ContentStyled = styled.p`
  padding: 8px 8px 8px 16px;
  background-color: ${({ theme }) => get(theme, "colors.background")};
  width: 100%;
  margin-left: 16px;
  border-radius: 50px;
`;

export default Comment;
