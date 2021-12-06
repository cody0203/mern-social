import { useMutation } from "react-query";
import { updatePost } from "../services/post";
import useMutatePostListInQuery from "./utils/useMutatePostListInQuery";

const useUpdatePost = (oldPost) => {
  const { updatePostById } = useMutatePostListInQuery();
  return useMutation(
    ["post", "update"],
    ({ id, params }) => updatePost(id, params),
    {
      onSuccess: (newPost) => {
        updatePostById(newPost);
      },
    }
  );
};

export default useUpdatePost;
