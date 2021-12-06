import { useMutation, useQueryClient } from "react-query";
import get from "lodash/get";
import { followUser } from "../services/follow";

const useFollowUserInProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ["follow", "follow-user"],
    (params) => followUser(params),
    {
      onSuccess: (data, params) => {
        const id = get(params, "followingId");

        queryClient.setQueryData(["user", "info", id], data);
        queryClient.invalidateQueries(["follow", "list"]);
      },
    }
  );
};

export default useFollowUserInProfile;
