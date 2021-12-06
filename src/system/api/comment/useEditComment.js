import { useMutation } from "react-query";
import useMutatePostListInQuery from "../post/utils/useMutatePostListInQuery";
import { editComment } from "../services/comment";

const useEditComment = () => {
  const { updatePostById } = useMutatePostListInQuery();
  return useMutation(["comment", "edit"], (data) => editComment(data), {
    onSuccess: (newPost) => {
      updatePostById(newPost);
    },
  });
};

export default useEditComment;
