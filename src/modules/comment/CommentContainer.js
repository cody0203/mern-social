import React from 'react';
import { get } from 'lodash';

import Comment from './Comment';

const CommentContainer = ({ comments }) => {
  return (
    <div>
      {comments &&
        comments.map((comment) => {
          const id = get(comment, '_id');
          return <Comment key={id} comment={comment} />;
        })}
    </div>
  );
};

export default CommentContainer;
