import { request, endPoints } from "../../../request";
import { getErrorMessage } from "../../util";

const getFollowList = async (id) => {
  try {
    const response = await request.get(
      `${endPoints.USERS}/who-to-following/${id}`
    );
    const { data } = response.data;

    return data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export default getFollowList;
