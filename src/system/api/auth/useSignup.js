import { useMutation } from "react-query";
import { signUp } from "../services/auth";

const useSignup = () =>
  useMutation(["auth", "signup"], (params) => signUp(params));

export default useSignup;
