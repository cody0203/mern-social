import { useMutation, useQueryClient } from "react-query";
import remove from "lodash/remove";
import { reactionPost } from "../services/post";
import useMutatePostListInQuery from "./utils/useMutatePostListInQuery";

const useReactionPost = (currentPost, reactUserId) => {
  const { updatePostById } = useMutatePostListInQuery();
  const queryClient = useQueryClient();
  return useMutation(["post", "reaction"], (id) => reactionPost(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["post", "list"]);

      const previousPostList = queryClient.getQueryData(["post", "list"]);

      const updatedPost = {
        ...currentPost,
        likes: currentPost.likes.includes(reactUserId)
          ? remove(currentPost.likes, reactUserId)
          : [...currentPost.likes, reactUserId],
      };
      updatePostById(updatedPost);

      return { previousPostList };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(["post", "list"], context.previousPostList);
    },
    onSuccess: () => {},
  });
};

export default useReactionPost;
