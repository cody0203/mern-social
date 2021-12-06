import { request, endPoints } from "../../../request";
import { getErrorMessage } from "../../util";

const followUser = async (params) => {
  try {
    const response = await request.put(`${endPoints.USER}/following`, params);
    const { data } = response.data;
    return data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export default followUser;
