import { useQuery } from "react-query";
import { getFollowList } from "../services/follow";

const useGetFollowList = (id) =>
  useQuery(["follow", "list"], () => getFollowList(id), {
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: 60 * 2000,
  });

export default useGetFollowList;
