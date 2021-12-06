import auth from "../../../auth/auth-helper";
import { request, endPoints } from "../../../request";
import { getErrorMessage } from "../../util";

const signIn = async (params) => {
  try {
    const response = await request.post(endPoints.SIGN_IN, params);
    const { user, token } = response.data;
    auth.authenticate(token);
    return user;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export default signIn;
