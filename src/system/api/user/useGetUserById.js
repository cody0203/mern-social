import { useQuery } from "react-query";
import { getUserById } from "../services/user";

const useGetUserById = (id) =>
  useQuery(["user", "info", id], () => getUserById(id), {
    cacheTime: 30000,
    refetchOnWindowFocus: false,
  });

export default useGetUserById;
