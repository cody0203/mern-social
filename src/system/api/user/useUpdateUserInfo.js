import { useMutation } from "react-query";
import { updateUserInfo } from "../services/user";

const useUpdateUserInfo = () =>
  useMutation(["user", "update"], ({ userId, params }) =>
    updateUserInfo({ userId, params })
  );

export default useUpdateUserInfo;
