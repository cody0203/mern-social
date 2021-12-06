import { useMutation, useQueryClient } from "react-query";
import get from "lodash/get";

import { postComment } from "../services/comment";
import { mockComment } from "../util/comment";
import useMutatePostListInQuery from "../post/utils/useMutatePostListInQuery";

const usePostComment = (post) => {
  const queryClient = useQueryClient();
  const { updatePostById } = useMutatePostListInQuery();
  return useMutation(
    ["comment", "post"],
    ({ id, params }) => postComment({ id, params }),
    {
      onMutate: async ({ id, params }) => {
        await queryClient.cancelQueries(["post", "list"]);

        const content = get(params, "content");
        const ownerId = get(params, "id");
        const ownerName = get(params, "ownerName");
        const mock = mockComment({ content, postId: id, ownerId, ownerName });
        const newPost = { ...post, comments: [...post.comments, mock] };
        const previousPostList = queryClient.getQueryData(["post", "list"]);
        updatePostById(newPost);

        return { previousPostList };
      },
      onError: (err, newPost, context) => {
        queryClient.setQueryData(["post", "list"], context.previousPostList);
      },
      onSuccess: (newPost) => {
        updatePostById(newPost);
      },
    }
  );
};

export default usePostComment;
