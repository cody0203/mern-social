import { useInfiniteQuery } from "react-query";
import get from "lodash/get";
import { getPostList } from "../services/post";

const useGetPostList = ({ id, isRefetch = true }) => {
  return useInfiniteQuery(
    id ? ["post", "list", id] : ["post", "list"],
    (innerParams) => {
      const pageParam = get(innerParams, "pageParam");
      return getPostList({ page: pageParam, id });
    },
    {
      getNextPageParam: (meta) => {
        const currentPage = get(meta, "currentPage");
        const totalPage = get(meta, "totalPage");

        return currentPage < totalPage ? currentPage + 1 : undefined;
      },
      refetchOnWindowFocus: false,
      staleTime: 60 * 2000,
      enabled: isRefetch,
    }
  );
};

export default useGetPostList;
