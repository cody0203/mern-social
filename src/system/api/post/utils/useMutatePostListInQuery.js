import { useQueryClient } from "react-query";
import get from "lodash/get";

const useMutatePostListInQuery = () => {
  const queryClient = useQueryClient();

  const deletePostById = (id) => {
    queryClient.setQueryData(["post", "list"], (old) => {
      const postList = get(old, "pages");
      const newPostList = postList.map((postPage) => ({
        ...postPage,
        data: postPage.data.filter((post) => post._id !== id),
      }));

      return {
        ...old,
        pages: newPostList,
      };
    });
  };

  const updatePostById = (newPost, replacingPostId) => {
    const id = replacingPostId || get(newPost, "_id");
    queryClient.setQueryData(["post", "list"], (old) => {
      const postList = get(old, "pages");
      const newPostList = postList.map((postPage) => ({
        ...postPage,
        data: postPage.data.map((post) => {
          if (post._id === id) {
            return newPost;
          }

          return post;
        }),
      }));

      return {
        ...old,
        pages: newPostList,
      };
    });
  };

  const addMockPostToList = (mock) => {
    queryClient.setQueryData(["post", "list"], (old) => {
      const postList = get(old, "pages");
      const newPostList = postList.map((postPage, index) => {
        if (index === 0) {
          return {
            ...postPage,
            data: [mock, ...postPage.data],
          };
        }

        return postPage;
      });
      return {
        ...old,
        pages: newPostList,
      };
    });
  };

  return { deletePostById, updatePostById, addMockPostToList };
};

export default useMutatePostListInQuery;
