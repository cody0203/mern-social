import { useQuery } from "react-query";
import { getUserInfo } from "../services/user";

const useGetUserInfo = () =>
  useQuery(["user", "info"], () => getUserInfo(), {
    enabled: false,
    refetchOnWindowFocus: false,
  });

export default useGetUserInfo;
