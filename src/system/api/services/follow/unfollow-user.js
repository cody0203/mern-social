import { request, endPoints } from "../../../request";
import { getErrorMessage } from "../../util";

const unfollowUser = async (params) => {
  try {
    const response = await request.put(`${endPoints.USER}/unfollow`, params);
    const { data } = response.data;
    return data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export default unfollowUser;
