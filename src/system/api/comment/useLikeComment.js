import { useMutation, useQueryClient } from "react-query";
import remove from "lodash/remove";
import get from "lodash/get";
import { likeComment } from "../services/comment";
import useMutatePostListInQuery from "../post/utils/useMutatePostListInQuery";

const useLikeComment = (userId) => {
  const queryClient = useQueryClient();
  const { updatePostById } = useMutatePostListInQuery();
  return useMutation(["comment", "like"], ({ id }) => likeComment(id), {
    onMutate: async ({ id, currentPost }) => {
      await queryClient.cancelQueries(["post", "list"]);

      const newPost = {
        ...currentPost,
        comments: currentPost.comments.map((existComment) => {
          const existCommentId = get(existComment, "_id");

          if (existCommentId === id) {
            const currentLikes = get(existComment, "likes");
            return {
              ...existComment,
              likes: !currentLikes.includes(userId)
                ? [...currentLikes, userId]
                : remove(currentLikes, userId),
            };
          }

          return existComment;
        }),
      };

      const previousPostList = queryClient.getQueryData(["post", "list"]);
      updatePostById(newPost);

      return { previousPostList };
    },
    onError: (error, newPost, context) => {
      queryClient.setQueryData(["post", "list"], context.previousPostList);
    },
    onSuccess: (newPost) => {
      updatePostById(newPost);
    },
  });
};

export default useLikeComment;
