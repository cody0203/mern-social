import { useMutation, useQueryClient } from "react-query";
import remove from "lodash/remove";
import get from "lodash/get";
import useMutatePostListInQuery from "../post/utils/useMutatePostListInQuery";
import { likeComment } from "../services/comment";

const useLikeReply = (userId) => {
  const queryClient = useQueryClient();
  const { updatePostById } = useMutatePostListInQuery();
  return useMutation(["reply", "like"], ({ id }) => likeComment(id), {
    onMutate: async ({ id, currentPost }) => {
      await queryClient.cancelQueries(["post", "list"]);
      const newPost = {
        ...currentPost,
        comments: currentPost.comments.map((existComment) => {
          const replies = existComment.replies.map((reply) => {
            const existReplyId = get(reply, "_id");

            if (existReplyId === id) {
              const currentLikes = get(reply, "likes");

              return {
                ...reply,
                likes: !currentLikes.includes(userId)
                  ? [...currentLikes, userId]
                  : remove(currentLikes, userId),
              };
            }

            return reply;
          });

          return { ...existComment, replies };
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

export default useLikeReply;
