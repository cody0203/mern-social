import { useMutation, useQueryClient } from "react-query";
import get from "lodash/get";
import { unfollowUser } from "../services/follow";

const useUnfollowUser = (myId) => {
  const queryClient = useQueryClient();

  return useMutation(["follow", "unfollow"], (params) => unfollowUser(params), {
    onSuccess: (data, params) => {
      const id = get(params, "unFollowingId");

      queryClient.setQueryData(["user", "info", id], data);
      queryClient.invalidateQueries(["follow", "list"]);
    },
  });
};

export default useUnfollowUser;
