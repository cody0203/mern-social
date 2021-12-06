import { request, endPoints } from "../../../request";
import { getErrorMessage } from "../../util";

const getUserInfo = async () => {
  try {
    const response = await request.get(endPoints.USER_INFO);
    const user = response.data;
    return user;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export default getUserInfo;
