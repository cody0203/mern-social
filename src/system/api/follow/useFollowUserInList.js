import { useMutation, useQueryClient } from "react-query";
import get from "lodash/get";
import filter from "lodash/filter";
import { followUser } from "../services/follow";

const useFollowUserInList = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ["follow", "follow-user"],
    (params) => followUser(params),
    {
      onSuccess: (_, params) => {
        const followingId = get(params, "followingId");
        const followingList = queryClient.getQueryData(["follow", "list"]);
        const updatedFollowingList = filter(
          [...followingList],
          (user) => get(user, "_id") !== followingId
        );

        queryClient.setQueryData(["follow", "list"], updatedFollowingList);
      },
    }
  );
};

export default useFollowUserInList;
