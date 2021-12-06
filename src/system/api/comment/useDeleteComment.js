import { useMutation } from "react-query";
import { deleteComment } from "../services/comment";
import useMutatePostListInQuery from "../post/utils/useMutatePostListInQuery";

const useDeleteComment = () => {
  const { updatePostById } = useMutatePostListInQuery();
  return useMutation(["comment, delete"], (id) => deleteComment(id), {
    onSuccess: (newPost) => {
      updatePostById(newPost);
    },
  });
};

export default useDeleteComment;
