import { request, endPoints } from "../../../request";
import { getErrorMessage } from "../../util";

const updateUserInfo = async ({ userId, params }) => {
  try {
    const response = await request.put(`${endPoints.USER}/${userId}`, params);
    return response;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export default updateUserInfo;
