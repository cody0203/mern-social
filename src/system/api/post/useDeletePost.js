import { useMutation, useQueryClient } from "react-query";
import { deletePost } from "../services/post";
import useMutatePostListInQuery from "./utils/useMutatePostListInQuery";

const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { deletePostById } = useMutatePostListInQuery();

  return useMutation(["post", "delete"], (id) => deletePost(id), {
    onMutate: async (deletingId) => {
      await queryClient.cancelQueries(["post", "list"]);

      const previousPostList = queryClient.getQueryData(["post", "list"]);
      deletePostById(deletingId);

      return { previousPostList };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(["post", "list"], context.previousPostList);
    },
  });
};

export default useDeletePost;
