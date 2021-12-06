import { useMutation } from "react-query";
import { deleteUser } from "../services/user";

const useDeleteUser = () =>
  useMutation(["user", "delete"], (id) => deleteUser(id));

export default useDeleteUser;
