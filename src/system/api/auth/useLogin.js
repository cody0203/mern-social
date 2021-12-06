import { useMutation } from "react-query";
import { signIn } from "../services/auth";

const useLogin = () => {
  return useMutation(["auth", "login"], (params) => signIn(params));
};

export default useLogin;
