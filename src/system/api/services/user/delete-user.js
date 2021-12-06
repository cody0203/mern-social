import auth from "../../../auth/auth-helper";
import { request, endPoints } from "../../../request";
import { getErrorMessage } from "../../util";

const deleteUser = async (id) => {
  try {
    const response = await request.delete(`${endPoints.USER}/${id}`);
    auth.clearToken();
    return response;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export default deleteUser;
