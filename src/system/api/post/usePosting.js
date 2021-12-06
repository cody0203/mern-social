import { useMutation, useQueryClient } from "react-query";
import get from "lodash/get";
import { posting } from "../services/post";
import { mockPost } from "../util/post";
import useMutatePostListInQuery from "./utils/useMutatePostListInQuery";

const usePosting = () => {
  const queryClient = useQueryClient();
  const { addMockPostToList, updatePostById } = useMutatePostListInQuery();
  return useMutation(["post", "posting"], (params) => posting(params), {
    onMutate: async (newData) => {
      await queryClient.cancelQueries(["post", "list"]);

      const previousPostList = queryClient.getQueryData(["post", "list"]);

      const mock = mockPost({
        content: get(newData, "params.content"),
        ownerId: get(newData, "ownerId"),
        ownerName: get(newData, "ownerName"),
      });

      addMockPostToList(mock);

      return { previousPostList };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(["post", "list"], context.previousPostList);
    },
    onSuccess: (newPost) => {
      updatePostById(newPost, "mock");
    },
    retry: false,
  });
};

export default usePosting;
