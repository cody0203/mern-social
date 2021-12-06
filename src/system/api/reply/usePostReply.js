import { useMutation, useQueryClient } from "react-query";
import get from "lodash/get";
import { mockComment } from "../util/comment";
import useMutatePostListInQuery from "../post/utils/useMutatePostListInQuery";
import { postReply } from "../services/reply";

const usePostReply = (ownerId) => {
  const queryClient = useQueryClient();
  const { updatePostById } = useMutatePostListInQuery();
  return useMutation(["reply", "post"], (data) => postReply(data), {
    onMutate: async ({ id, currentPost, params }) => {
      await queryClient.cancelQueries(["post", "list"]);

      const content = get(params, "content");
      const mock = mockComment({ content, ownerId });
      const previousPostList = queryClient.getQueryData(["post", "list"]);

      const newPost = {
        ...currentPost,
        comments: [...currentPost.comments].map((existComment) => {
          const existCommentId = get(existComment, "_id");
          if (existCommentId === id) {
            return {
              ...existComment,

              replies: [...existComment.replies, mock],
            };
          }

          return existComment;
        }),
      };

      updatePostById(newPost);
      return { previousPostList };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(["post", "list"], context.previousPostList);
    },
    onSuccess: (newPost) => {
      updatePostById(newPost);
    },
  });
};

export default usePostReply;
